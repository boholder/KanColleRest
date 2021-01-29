import ShipInfoService from "../../service/ship-info.service";
import ShipInfoRequestDto from "../../dto/ship-info-request.dto";
import {Response} from "jest-express/lib/response";
import {ResponseSender} from "../../route/response-sender";
import config from "config";
import {DatabaseQueryExecuteError, ModelBuildError} from "../../util/error";
import ShipDao from "../../db/dao/ship.dao";

let shipDbName = config.get("resource.datasource.nedb_file_names.ship");
const mockShipDbError = new DatabaseQueryExecuteError(shipDbName);
const mockModelBuildError = new ModelBuildError('test_model');
const mockOtherError = new Error('error');
jest.mock('../../db/dao/ship.dao', () => (
    {
        getModelBy: jest.fn(id => {
            if (id === 1) {
                return Promise.resolve({});
            } else if (id === 2) {
                return Promise.resolve({name: {zh_cn: 'ZH-CH-NAME'}});
            } else if (id === 3) {
                return Promise.reject(mockShipDbError);
            } else if (id === 4) {
                return Promise.reject(mockModelBuildError);
            } else if (id === 5) {
                return Promise.reject(mockOtherError);
            }
        }),

        getModelsBy: jest.fn(query => {
            let testFlag = query['name.zh_cn'];
            if (testFlag === 'return_db_error') {
                return Promise.reject(mockShipDbError);
            } else if (testFlag === 'return_ships') {
                return Promise.resolve(
                    [{name: {zh_cn: 'ZH-CH-NAME'}}, {name: {zh_cn: 'ZH-CH-NAME'}}]);
            }
            // return empty to turn to similar ship name logic
            return Promise.resolve([]);
        }),

        getNamesBy: jest.fn(query => {
            let testFlag = query['name.zh_cn'];
            if (testFlag && testFlag === '.*return_similar_empty.*') {
                return Promise.resolve([]);
            } else if (testFlag && testFlag === '.*return_similar_ships.*') {
                return Promise.resolve([{name: {zh_cn: 'similar'}}]);
            } else if (testFlag && testFlag === '.*return_similar_db_error.*') {
                return Promise.reject(mockShipDbError);
            }
            // to normally return from this function
            return Promise.resolve([]);
        })
    }
));

jest.mock("../../route/response-sender", () => ({
    ResponseSender: {
        sendPngOr404DontLogError: jest.fn(),
        send400BadRequest: jest.fn(),
        send500InternalServerError: jest.fn(),
        send204NoContent: jest.fn(),
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
    ResponseSender.send204NoContent.mockClear();
    ResponseSender.sendPngOr404DontLogError.mockClear();
    ResponseSender.sendPngOr404.mockClear();
});
describe('matchById method should:', () => {
    it('response 204 when db query get nothing', async () => {
        let params = new ShipInfoRequestDto('1', 'id', 'json');
        return ShipInfoService.matchById(res, params).then(value => {
            expect(ResponseSender.send204NoContent).toBeCalledTimes(1);
        })
    })

    it('response json format result when requested', () => {
        let params = new ShipInfoRequestDto('2', 'id', 'json');
        return ShipInfoService.matchById(res, params).then(value => {
            expect(ResponseSender.sendJson).toBeCalledTimes(1);
        });
    })

    it('response image format result when requested', () => {
        let params = new ShipInfoRequestDto('2', 'id', 'img');
        return ShipInfoService.matchById(res, params).then(value => {
            let mian_dir = config.get('resource.image.mian_image_dir');
            expect(ResponseSender.sendPngOr404DontLogError)
                .toHaveBeenLastCalledWith(res, `${mian_dir}/ship/ship_info/ZH-CH-NAME1.png`);
        });
    })

    it('response 400 when dao throw a DatabaseQueryExecuteError,' +
        ' and error happened in ship db', () => {
        let params = new ShipInfoRequestDto('3', 'id', 'json');
        return ShipInfoService.matchById(res, params).then(value => {
            expect(ResponseSender.send400BadRequest).toBeCalledTimes(1);
        });
    })

    it('response 400 when dao throw a ModelBuildError' +
        ' and error happened in other db except ship db', () => {
        let params = new ShipInfoRequestDto('4', 'id', 'json');
        return ShipInfoService.matchById(res, params).then(value => {
            expect(ResponseSender.send400BadRequest).toBeCalledTimes(1);
        });
    })

    it('response 500 when dao throw a not-db-query-or-model-build Error,', () => {
        let params = new ShipInfoRequestDto('5', 'id', 'json');
        return ShipInfoService.matchById(res, params).then(value => {
            expect(ResponseSender.send500InternalServerError).toBeCalledTimes(1);
        });
    })
})

describe('matchByName() should:', () => {
    it('build correct db query based on request params', () => {
        // request is en_us name format but change it to ja_romaji name format in query
        let params = new ShipInfoRequestDto('Yamato', 'en_us', 'json');
        return ShipInfoService.matchByName(res, params).then(value => {
            expect(ShipDao.getModelsBy).toHaveBeenLastCalledWith(
                {'name.ja_romaji': 'yamato'});
        });
        // no need to change, just pass and build query
        let params2 = new ShipInfoRequestDto('名字', 'zh_cn', 'json');
        return ShipInfoService.matchByName(res, params2).then(value => {
            expect(ShipDao.getModelsBy).toHaveBeenLastCalledWith(
                {'name.zh_cn': '名字'});
        });
    })

    it('response 400 when dao throw a DatabaseQueryExecuteError,' +
        ' and error happened in ship db', () => {
        let params = new ShipInfoRequestDto('return_db_error', 'zh_cn', 'json');
        return ShipInfoService.matchByName(res, params).then(value => {
            expect(ResponseSender.send400BadRequest).toBeCalledTimes(1);
        });
    })

    it('response json format result when requested', () => {
        let params = new ShipInfoRequestDto('return_ships', 'zh_cn', 'json');
        return ShipInfoService.matchByName(res, params).then(value => {
            expect(ResponseSender.sendJson).toHaveBeenLastCalledWith(
                res,[{name: {zh_cn: 'ZH-CH-NAME'}}, {name: {zh_cn: 'ZH-CH-NAME'}}]);
        });
    })

    it('response image format result when requested', () => {
        let params = new ShipInfoRequestDto('return_ships', 'zh_cn', 'img');
        return ShipInfoService.matchByName(res, params).then(value => {
            let mian_dir = config.get('resource.image.mian_image_dir');
            expect(ResponseSender.sendPngOr404DontLogError)
                .toHaveBeenLastCalledWith(res, `${mian_dir}/ship/ship_info/ZH-CH-NAME1.png`);
        });
    })
})

describe('matchByName() will trying to suggest similar ship names when ' +
    'couldn\'t exactly match any ship based on name', () => {

    it('response 204 couldn\'t find any similar ship name', () => {
        let params = new ShipInfoRequestDto('return_similar_empty', 'zh_cn');
        return ShipInfoService.matchByName(res, params).then(value => {
            expect(ResponseSender.send204NoContent).toBeCalledTimes(1);
        })
    })

    it('response 400 encounters ship db error when querying similar ship names', () => {
        let params = new ShipInfoRequestDto('return_similar_db_error', 'zh_cn');
        return ShipInfoService.matchByName(res, params).then(value => {
            expect(ResponseSender.send400BadRequest).toBeCalledTimes(1);
        })
    })

    it('response 204 with suggest names, when finds some similar ship names', () => {
        let params = new ShipInfoRequestDto('return_similar_ships', 'zh_cn');
        return ShipInfoService.matchByName(res, params).then(value => {
            expect(ResponseSender.send204NoContent).toBeCalledTimes(1);
        })
    })
})