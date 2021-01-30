import ShipInfoService from "../../service/ship-info.service";
import ShipInfoRequestDto from "../../dto/ship-info-request.dto";
import {Response} from "jest-express/lib/response";
import {ResponseSender} from "../../route/response-sender";
import config from "config";
import {DatabaseQueryExecuteFailError, DatabaseQueryExecuteNoResultError, ModelBuildError} from "../../util/error";
import ShipDao from "../../db/dao/ship.dao";

let shipDbName = config.get("resource.datasource.nedb_file_names.ship") + '.nedb';
const mockModelBuildError = new ModelBuildError('test_model');
const mockOtherError = new Error('error');
const mockDbFailError = new DatabaseQueryExecuteFailError(shipDbName, '{query:test}');
const mockNoResultError = new DatabaseQueryExecuteNoResultError(shipDbName, '{query:test}');
jest.mock('../../db/dao/ship.dao', () => (
    {
        getModelBy: jest.fn(id => {
            if (id === 1) {
                return Promise.reject(mockNoResultError);
            } else if (id === 2) {
                return Promise.resolve({name: {zh_cn: 'ZH-CN-NAME'}});
            } else if (id === 3) {
                return Promise.reject(mockDbFailError);
            } else if (id === 4) {
                return Promise.reject(mockModelBuildError);
            } else if (id === 5) {
                return Promise.reject(mockOtherError);
            }
        }),

        getModelsBy: jest.fn(query => {
            let testFlag = query['name.zh_cn'];
            if (testFlag === 'return_db_error') {
                return Promise.reject(mockDbFailError);
            } else if (testFlag === 'return_ships') {
                return Promise.resolve(
                    [{name: {zh_cn: 'ZH-CN-NAME'}}, {name: {zh_cn: 'ZH-CN-NAME'}}]);
            }
            // return empty to turn to similar ship name logic
            return Promise.reject(mockNoResultError);
        }),

        getNamesBy: jest.fn(query => {
            let emptyFlag = query['name.empty'];
            let resultFlag = query['name.result'];
            let errorFlag = query['name.error'];

            if (emptyFlag) {
                return Promise.reject(mockNoResultError);
            } else if (resultFlag) {
                return Promise.resolve([{name: {zh_cn: 'similar'}}]);
            } else if (errorFlag) {
                return Promise.reject(mockDbFailError);
            }
            // to normally return from this function
            return Promise.reject(mockNoResultError);
        }),

        getIdNameBy: jest.fn(() =>
            Promise.resolve({id: 1, name: {zh_cn: 'ZH-CN-NAME'}})),

        getRawJsonsBy: jest.fn(() =>
            Promise.resolve([{id: 1, name: {zh_cn: 'ZH-CN-NAME'}}]))
    }
));

jest.mock("../../route/response-sender", () => ({
    ResponseSender: {
        sendPngOr404DontLogError: jest.fn(),
        send400BadRequest: jest.fn(),
        send500InternalServerError: jest.fn(),
        send404NotFound: jest.fn(),
        sendJson: jest.fn(),
        sendPngOr404: jest.fn()
    }
}))

let res;

beforeEach(() => {
    res = new Response();
});

afterEach(() => {
    res.resetMocked();
    ResponseSender.send400BadRequest.mockClear();
    ResponseSender.send500InternalServerError.mockClear();
    ResponseSender.sendJson.mockClear();
    ResponseSender.send404NotFound.mockClear();
    ResponseSender.sendPngOr404DontLogError.mockClear();
    ResponseSender.sendPngOr404.mockClear();
});
describe('matchById() should:', () => {
    it('response 404 when db query get nothing', async () => {
        let params = new ShipInfoRequestDto(
            '1', 'id', 'json');
        return ShipInfoService.matchById(res, params).then(value => {
            expect(ResponseSender.send404NotFound).toBeCalledTimes(1);
        })
    })

    it('response json format result when requested', () => {
        let params = new ShipInfoRequestDto(
            '2', 'id', 'json');
        return ShipInfoService.matchById(res, params).then(value => {
            expect(ResponseSender.sendJson).toBeCalledTimes(1);
        });
    })

    it('response image format result when requested', () => {
        let params = new ShipInfoRequestDto(
            '2', 'id', 'img');
        return ShipInfoService.matchById(res, params).then(value => {
            let mian_dir = config.get('resource.image.mian_image_dir');
            expect(ResponseSender.sendPngOr404DontLogError)
                .toHaveBeenLastCalledWith(res, `${mian_dir}/ship/ship_info/ZH-CN-NAME1.png`);
        });
    })

    it('response 400 when dao throw a DatabaseQueryExecuteFailError,' +
        ' and error happened in ship db', () => {
        let params = new ShipInfoRequestDto(
            '3', 'id', 'json');
        return ShipInfoService.matchById(res, params).then(value => {
            expect(ResponseSender.send400BadRequest).toBeCalledTimes(1);
        });
    })

    it('response 400 when dao throw a ModelBuildError' +
        ' and error happened in other db except ship db', () => {
        let params = new ShipInfoRequestDto(
            '4', 'id', 'json');
        return ShipInfoService.matchById(res, params).then(value => {
            expect(ResponseSender.send400BadRequest).toBeCalledTimes(1);
        });
    })

    it('response 500 when dao throw a not-db-query-or-model-build Error,', () => {
        let params = new ShipInfoRequestDto(
            '5', 'id', 'json');
        return ShipInfoService.matchById(res, params).then(value => {
            expect(ResponseSender.send500InternalServerError).toBeCalledTimes(1);
        });
    })
})

describe('matchByName() should:', () => {
    it('build correct db query based on request params', () => {
        // request is en_us name format but change it to ja_romaji name format in query
        let params = new ShipInfoRequestDto(
            'Yamato', 'en_us', 'json');
        return ShipInfoService.matchByName(res, params).then(value => {
            expect(ShipDao.getModelsBy).toHaveBeenLastCalledWith(
                {'name.ja_romaji': 'yamato'});
        });
        // no need to change, just pass and build query
        let params2 = new ShipInfoRequestDto(
            '名字', 'zh_cn', 'json');
        return ShipInfoService.matchByName(res, params2).then(value => {
            expect(ShipDao.getRawJsonsBy).toHaveBeenLastCalledWith(
                {'name.zh_cn': '名字'});
        });
    })

    it('response 400 when dao throw a DatabaseQueryExecuteFailError,' +
        ' and error happened in ship db', () => {
        let params = new ShipInfoRequestDto(
            'return_db_error', 'zh_cn', 'json');
        return ShipInfoService.matchByName(res, params).then(value => {
            expect(ResponseSender.send400BadRequest).toBeCalledTimes(1);
        });
    })

    it('response json format result when requested', () => {
        let params = new ShipInfoRequestDto(
            'return_ships', 'zh_cn', 'json');
        return ShipInfoService.matchByName(res, params).then(value => {
            expect(ResponseSender.sendJson).toHaveBeenLastCalledWith(
                res, [{name: {zh_cn: 'ZH-CN-NAME'}}, {name: {zh_cn: 'ZH-CN-NAME'}}]);
        });
    })

    it('response image format result when requested', () => {
        let params = new ShipInfoRequestDto(
            'return_ships', 'zh_cn', 'img');
        return ShipInfoService.matchByName(res, params).then(value => {
            let mian_dir = config.get('resource.image.mian_image_dir');
            expect(ResponseSender.sendPngOr404DontLogError)
                .toHaveBeenLastCalledWith(res, `${mian_dir}/ship/ship_info/ZH-CN-NAME1.png`);
        });
    })
})

describe('matchByName() will trying to suggest similar ship names when ' +
    'couldn\'t exactly match any ship based on name', () => {

    it('response 404 couldn\'t find any similar ship name', () => {
        let params = new ShipInfoRequestDto('t', 'empty');
        return ShipInfoService.matchByName(res, params).then(value => {
            expect(ResponseSender.send404NotFound).toBeCalledTimes(1);
        })
    })

    it('response 400 encounters ship db error when querying similar ship names', () => {
        let params = new ShipInfoRequestDto('t', 'error');
        return ShipInfoService.matchByName(res, params).then(value => {
            expect(ResponseSender.send400BadRequest).toBeCalledTimes(1);
        })
    })

    it('response 404 with suggest names, when finds some similar ship names', () => {
        let params = new ShipInfoRequestDto('t', 'result');
        return ShipInfoService.matchByName(res, params).then(value => {
            expect(ResponseSender.send404NotFound).toBeCalledTimes(1);
        })
    })
})