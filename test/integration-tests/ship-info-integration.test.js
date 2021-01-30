import {app} from "../../app";
import request from "supertest";
import {ShipInfoRouteUtil} from "../../util/route/ship-info-route.util";
import {expect200Json, expect200Png, expect400, expect404} from "./integration-expects-on-response";

describe("Test ship-info API normally response json format " +
    "bases on different match format", () => {

    it("should perform id match", async () => {
        const res = await request(app).get(
            ShipInfoRouteUtil.buildRequestRouteWith(
                '1', 'id', 'json')
        );
        expect200Json(res);
    });

    it('should perform zh_cn name match', async () => {
        const res = await request(app).get(
            ShipInfoRouteUtil.buildRequestRouteWith(
                '时雨', 'zh_cn', 'json')
        );
        expect200Json(res);
    })

    it('should perform ja_jp name match', async () => {
        const res = await request(app).get(
            ShipInfoRouteUtil.buildRequestRouteWith(
                '鹿島', 'ja_jp', 'json')
        );
        expect200Json(res);
    })

    it('should perform en_us (ja_romaji) name match', async () => {
        const res = await request(app).get(
            ShipInfoRouteUtil.buildRequestRouteWith(
                'Murasame', 'en_us', 'json')
        );
        expect200Json(res);
    })

    it('should perform ja_kana name match', async () => {
        const res = await request(app).get(
            ShipInfoRouteUtil.buildRequestRouteWith(
                'はつはる', 'ja_kana', 'json')
        );
        expect200Json(res);
    })
});

describe("Test ship-info API normally response image format " +
    "bases on different match format", () => {

    it("should perform id match", async () => {
        const res = await request(app).get(
            ShipInfoRouteUtil.buildRequestRouteWith(
                '1', 'id', 'img')
        );
        expect200Png(res);
    });

    it('should perform zh_cn name match', async () => {
        const res = await request(app).get(
            ShipInfoRouteUtil.buildRequestRouteWith(
                '时雨', 'zh_cn', 'img')
        );
        expect200Png(res);
    })

    it('should perform ja_jp name match', async () => {
        const res = await request(app).get(
            ShipInfoRouteUtil.buildRequestRouteWith(
                '鹿島', 'ja_jp', 'img')
        );
        expect200Png(res);
    })

    it('should perform en_us (ja_romaji) name match', async () => {
        const res = await request(app).get(
            ShipInfoRouteUtil.buildRequestRouteWith(
                'Murasame', 'en_us', 'img')
        );
        expect200Png(res);
    })

    it('should perform ja_kana name match', async () => {
        const res = await request(app).get(
            ShipInfoRouteUtil.buildRequestRouteWith(
                'はつはる', 'ja_kana', 'img')
        );
        expect200Png(res);
    })
});

describe('Test ship-info API abnormal request handling (matching by id)', () => {

    it('should response 400 when id is not a valid number but request matching by id', async function () {
        const res = await request(app).get(
            ShipInfoRouteUtil.buildRequestRouteWith(
                'not a number', 'id', 'json')
        );
        expect400(res);
    });

    it('should response 400 when id is not a positive number', async function () {
        const res = await request(app).get(
            ShipInfoRouteUtil.buildRequestRouteWith(
                '0', 'id', 'json')
        );
        expect400(res);
    });

    it('should response 400 when id is positive number but too big', async function () {
        const res = await request(app).get(
            ShipInfoRouteUtil.buildRequestRouteWith(
                `999999`, 'id', 'json')
        );
        expect400(res);
    });
})

describe('Test ship-info API abnormal request handling (matching by name)', () => {

    it('should response 404 when matches nothing, no similar ship name', async function () {
        const res = await request(app).get(
            ShipInfoRouteUtil.buildRequestRouteWith(
                `no_this_ship_name`, 'en_us', 'json')
        );
        expect404(res);
    });

    it('should response 404 with suggestion ' +
        'when matches nothing but found similar names', async function () {
        const res = await request(app).get(
            ShipInfoRouteUtil.buildRequestRouteWith(
                `雨`, 'zh_cn', 'json')
        );
        expect404(res);
    });

    it('should response 400 when request have a invalid match format', async function () {
        const res = await request(app).get(
            ShipInfoRouteUtil.buildRequestRouteWith(
                `999999`, 'invalid_format', 'json')
        );
        expect400(res);
    });
})

it('should response 400 when request have a invalid response format', async function () {
    const res = await request(app).get(
        ShipInfoRouteUtil.buildRequestRouteWith(
            `1`, 'id', 'invalid_format')
    );
    expect400(res);
});