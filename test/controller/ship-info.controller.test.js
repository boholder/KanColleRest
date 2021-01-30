import {Request} from 'jest-express/lib/request';
import {Response} from 'jest-express/lib/response';
import {ShipInfoRouteUtil} from "../../util/route/ship-info-route.util";
import ShipInfoService from "../../service/ship-info.service";
import ShipInfoController from "../../route/controller/ship-info.controller";

jest.mock('../../service/ship-info.service', () => (
    {
        matchById: jest.fn((res, params) => {
            res.json('test_ok');
        }),
        matchByName: jest.fn((res, params) => {
            res.json('test_ok');
        })
    }
));

let res;

beforeEach(() => {
    res = new Response();
});

afterEach(() => {
    res.resetMocked();
});

it('send hint json to GET request ' +
    'which doesn\'t have "ship" param', () => {
    let req = new Request(ShipInfoRouteUtil.route);
    ShipInfoController.getInfo(req, res);
    expect(res.json).toBeCalledTimes(1);
})

describe('Controller response 400 when any of 3 request params contains invalid value', () => {
    test('request match format is id but match value is not a number', async () => {
        let req = new Request(
            ShipInfoRouteUtil.buildRequestRouteWith(
                'match_format_is_id_but_match_value_is_not_a_number', 'id'));
        ShipInfoController.getInfo(req, res);
        expect(res.statusCode).toBe(400);
    })
    test('id is number but negative', async () => {
        let req = new Request(
            ShipInfoRouteUtil.buildRequestRouteWith(-1, 'id')
        );
        ShipInfoController.getInfo(req, res);
        expect(res.statusCode).toBe(400);
    })
    test('id is number but too big', async () => {
        let req = new Request(
            ShipInfoRouteUtil.buildRequestRouteWith(9999999, 'id')
        );
        ShipInfoController.getInfo(req, res);
        expect(res.statusCode).toBe(400);
    })
    test('invalid match format', async () => {
        let req = new Request(
            ShipInfoRouteUtil.buildRequestRouteWith(1, 'invalid_format'));

        ShipInfoController.getInfo(req, res);
        expect(res.statusCode).toBe(400);
    })
    test('invalid response format', async () => {
        let req = new Request(
            ShipInfoRouteUtil.buildRequestRouteWith(
                1, 'id', 'invalid_format')
        );
        ShipInfoController.getInfo(req, res);
        expect(res.statusCode).toBe(400);
    })
});

describe('Controller response normally to correct requests, ' +
    'which will call service methods', () => {

    test('request format id, response json format', async () => {
        let req = new Request(
            ShipInfoRouteUtil.buildRequestRouteWith(
                1, 'id', 'json')
        );
        ShipInfoController.getInfo(req, res);
        expect(res.json).toBeCalledTimes(1);
        expect(ShipInfoService.matchById).toHaveBeenCalledTimes(1);
    })
    test('request format zh_cn name, response json format', async () => {
        let req = new Request(
            ShipInfoRouteUtil.buildRequestRouteWith(
                '村雨', 'zh_cn', 'json'));
        ShipInfoController.getInfo(req, res);
        expect(res.json).toBeCalledTimes(1);
        expect(ShipInfoService.matchByName).toHaveBeenCalledTimes(1);
    })
})