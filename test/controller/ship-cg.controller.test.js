import {Request} from 'jest-express/lib/request';
import {Response} from 'jest-express/lib/response';
import {ShipCgRouteUtil} from "../../util/route/ship-cg-route.util";
import ShipCgController from "../../route/controller/ship-cg.controller";
import ShipCgService from "../../service/ship-cg.service";

jest.mock("../../service/ship-cg.service", () => (
    {
        matchById: jest.fn((res, id, cgIdParam) => Promise.resolve('ok'))
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
    'which doesn\'t have "shipid" param', () => {
    let req = new Request(ShipCgRouteUtil.route);
    ShipCgController.getCg(req, res);
    expect(res.json).toBeCalledTimes(1);
})

describe('Controller response 400 when any of 2 request params contains invalid value', () => {
    test('id is not a number', async () => {
        let req = new Request(
            ShipCgRouteUtil.buildRequestRouteWith(
                'id_is_not_a_number', 'n1'));
        ShipCgController.getCg(req, res);
        expect(res.statusCode).toBe(400);
    })
    test('id is number but negative', async () => {
        let req = new Request(
            ShipCgRouteUtil.buildRequestRouteWith(-1, 'n1')
        );
        ShipCgController.getCg(req, res);
        expect(res.statusCode).toBe(400);
    })
    test('id is number but too big', async () => {
        let req = new Request(
            ShipCgRouteUtil.buildRequestRouteWith(9999999, 'n1')
        );
        ShipCgController.getCg(req, res);
        expect(res.statusCode).toBe(400);
    })
    test('invalid cg type format', async () => {
        let req = new Request(
            ShipCgRouteUtil.buildRequestRouteWith(1, '0_is_invalid_type_abbreviation'));

        ShipCgController.getCg(req, res);
        expect(res.statusCode).toBe(400);
    })
});

describe('Controller send normal response to correct requests, ' +
    'which will call service methods', () => {

    test('a normal request', async () => {
        let req = new Request(
            ShipCgRouteUtil.buildRequestRouteWith(1, 'n1')
        );
        ShipCgController.getCg(req, res);
        expect(ShipCgService.matchById).toHaveBeenCalledTimes(1);
    })
})