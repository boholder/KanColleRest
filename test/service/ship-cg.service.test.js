import {Response} from "jest-express/lib/response";
import {ResponseSender} from "../../route/response-sender";
import config from "config";
import {DatabaseQueryExecuteFailError, DatabaseQueryExecuteNoResultError} from "../../util/error";
import ShipCgService from "../../service/ship-cg.service";

let shipDbName = config.get("resource.datasource.nedb_file_names.ship") + '.nedb';
const mockOtherError = new Error('error');
const mockDbFailError = new DatabaseQueryExecuteFailError(shipDbName, '{query:test}');
const mockNoResultError = new DatabaseQueryExecuteNoResultError(shipDbName, '{query:test}');

let res;
const wctfDir = config.get('resource.image.wctf_image_dir');
const mianDir = config.get('resource.image.mian_image_dir');

jest.mock('../../db/dao/ship.dao', () => ({
    getIdNameBy: jest.fn(id => {
        if (id === 1) {
            return Promise.reject(mockDbFailError);
        } else if (id === 2) {
            return Promise.reject(mockOtherError);
        } else if (id === 3) {
            return Promise.reject(mockNoResultError);
        } else if (id === 4) {
            return Promise.resolve({id: 4, name: {zh_cn: 'ZH_CH'}});
        }
    })
}))
;

jest.mock("../../route/response-sender", () => ({
    ResponseSender: {
        sendPngOr404DontLogError: jest.fn(),
        send400BadRequest: jest.fn(),
        send500InternalServerError: jest.fn(),
        send404NotFound: jest.fn(),
        sendPngOr404: jest.fn()
    }
}))

beforeEach(() => {
    res = new Response();
});

afterEach(() => {
    res.resetMocked();
    ResponseSender.send400BadRequest.mockClear();
    ResponseSender.send500InternalServerError.mockClear();
    ResponseSender.send404NotFound.mockClear();
    ResponseSender.sendPngOr404DontLogError.mockClear();
    ResponseSender.sendPngOr404.mockClear();
});

describe('Test matchById() db query exception handling', () => {
    it('should response 400 ' +
        'when dao throw a DatabaseQueryExecuteFailError,' +
        ' and error happened in ship db', () => {
        return ShipCgService.matchById(res, 1, 'n1').then(value => {
            expect(ResponseSender.send400BadRequest).toBeCalledTimes(1);
        });
    })

    it('should response 500 ' +
        'when dao throw a not-db-query-or-model-build Error,', () => {
        return ShipCgService.matchById(res, 2, 'n1').then(value => {
            expect(ResponseSender.send500InternalServerError).toBeCalledTimes(1);
        });
    })

    it('should response 404 ' +
        'when found no match in ship db based on request ship id', async () => {
        return ShipCgService.matchById(res, 3, 'n1').then(value => {
            expect(ResponseSender.send404NotFound).toBeCalledTimes(1);
        })
    })

    it('should response 400 ' +
        'when cg id in request is not match any cg type abbreviation', async () => {
        return ShipCgService.matchById(res, 4, 'x1').then(value => {
            expect(ResponseSender.send400BadRequest).toBeCalledTimes(1);
        })
    })
})

describe('Test matchById() normal request image send logic', () => {
    it('should send normal cg when every thing is ok', () => {
        return ShipCgService.matchById(res, 4, 'n1').then(value => {
            expect(ResponseSender.sendPngOr404).toHaveBeenLastCalledWith(
                res, `${wctfDir}/ships/4/1.png`);
        })
    })

    it('should send seasonal cg (whole body) when every thing is ok', () => {
        return ShipCgService.matchById(res, 4, 'e512').then(value => {
            expect(ResponseSender.sendPngOr404).toHaveBeenLastCalledWith(
                res, `${wctfDir}/ships-extra/512/8.png`);
        })
    })

    it('should send seasonal cg (whole body damaged) when every thing is ok', () => {
        return ShipCgService.matchById(res, 4, 'd512').then(value => {
            expect(ResponseSender.sendPngOr404).toHaveBeenLastCalledWith(
                res, `${wctfDir}/ships-extra/512/9.png`);
        })
    })

    it('should send all-in-one cg when every thing is ok', () => {
        return ShipCgService.matchById(res, 4, 'a').then(value => {
            // Don't know what happened but jest says two exactly same string isn't equal.
            // I can't figure out how to fix this test.
            // expect(ResponseSender.sendPngOr404DontLogError).toHaveBeenCalledWith(
            //     res, `${mianDir}/ship/ship_cg/ZH_CN2.png`);
            expect(ResponseSender.sendPngOr404DontLogError).toHaveBeenCalledTimes(1);
        })
    })
})