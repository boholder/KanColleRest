import {app} from "../../app";
import request from "supertest";
import {expect200Json, expect200Png, expect400, expect404} from "./integration-expects-on-response";
import {ShipCgRouteUtil} from "../../util/route/ship-cg-route.util";

describe("Test ship-cg API normally response image" +
    "bases on different match format", () => {

    it("should return banner image", async () => {
        const res = await request(app).get(
            ShipCgRouteUtil.buildRequestRouteWith('1', 'n0')
        );
        expect200Png(res);
    });
    it("should banner_masked return image", async () => {
        const res = await request(app).get(
            ShipCgRouteUtil.buildRequestRouteWith('1', 'n0-1')
        );
        expect200Png(res);
    });
    it("should return banner_dmged image", async () => {
        const res = await request(app).get(
            ShipCgRouteUtil.buildRequestRouteWith('1', 'n1')
        );
        expect200Png(res);
    });
    it("should return banner_dmged_masked image", async () => {
        const res = await request(app).get(
            ShipCgRouteUtil.buildRequestRouteWith('1', 'n1-1')
        );
        expect200Png(res);
    });
    it("should return card image", async () => {
        const res = await request(app).get(
            ShipCgRouteUtil.buildRequestRouteWith('1', 'n2')
        );
        expect200Png(res);
    });
    it("should return card_dmged image", async () => {
        const res = await request(app).get(
            ShipCgRouteUtil.buildRequestRouteWith('1', 'n3')
        );
        expect200Png(res);
    });
    it("should return whole_body image", async () => {
        const res = await request(app).get(
            ShipCgRouteUtil.buildRequestRouteWith('1', 'n8')
        );
        expect200Png(res);
    });
    it("should return whole_body_dmged image", async () => {
        const res = await request(app).get(
            ShipCgRouteUtil.buildRequestRouteWith('1', 'n9')
        );
        expect200Png(res);
    });
    it("should return head_masked image", async () => {
        const res = await request(app).get(
            ShipCgRouteUtil.buildRequestRouteWith('1', 'n10')
        );
        expect200Png(res);
    });
    it("should return head_dmged_masked image", async () => {
        const res = await request(app).get(
            ShipCgRouteUtil.buildRequestRouteWith('1', 'n11')
        );
        expect200Png(res);
    });
    it("should return seasonal whole_body image", async () => {
        const res = await request(app).get(
            ShipCgRouteUtil.buildRequestRouteWith('1', 'e1')
        );
        expect200Png(res);
    });
    it("should return seasonal whole_body_dmged image", async () => {
        const res = await request(app).get(
            ShipCgRouteUtil.buildRequestRouteWith('1', 'd1')
        );
        expect200Png(res);
    });
    it("should return all-in-one cg image", async () => {
        const res = await request(app).get(
            ShipCgRouteUtil.buildRequestRouteWith('1', 'a')
        );
        expect200Png(res);
    });
});

describe('ship-cg API response 400 when ship id param is invalid', () => {
    test('id is not a number', async function () {
        const res = await request(app).get(
            ShipCgRouteUtil.buildRequestRouteWith('not_a_number', 'n1')
        );
        expect400(res);
    });
    test('id is number but not positive', async function () {
        const res = await request(app).get(
            ShipCgRouteUtil.buildRequestRouteWith('0', 'n1')
        );
        expect400(res);
    });
    test('id is a positive number but too big', async function () {
        const res = await request(app).get(
            ShipCgRouteUtil.buildRequestRouteWith('999999', 'n1')
        );
        expect400(res);
    });
})

describe('Test ship-cg API responses when cg id param is invalid',  () => {
    it('should response 400 when ' +
        'cg type abbreviation (1st character of cg id) is invalid', async function () {
        const res = await request(app).get(
            ShipCgRouteUtil.buildRequestRouteWith('1', '0_is_invalid_type_abbr')
        );
        expect400(res);
    });
    it('should response 404 when ' +
        'can not match ship based on id', async function () {
        const res = await request(app).get(
            ShipCgRouteUtil.buildRequestRouteWith('999', 'n1')
        );
        expect404(res);
    });
    it('should response 404 when ' +
        'can not match cg based on cg id', async function () {
        const res = await request(app).get(
            ShipCgRouteUtil.buildRequestRouteWith('1', 'n99')
        );
        expect404(res);
    });
})

describe('ship-cg API should response hint json when ' +
    'any required parameter does not exist in request', function () {
    test('miss ship id', async function () {
        const res = await request(app).get(
            `${ShipCgRouteUtil.route}?${ShipCgRouteUtil.cgIdParam}=n1`
        );
        expect200Json(res);
    });
    test('miss cg id', async function () {
        const res = await request(app).get(
            `${ShipCgRouteUtil.route}?${ShipCgRouteUtil.shipIdParam}=1`
        );
        expect200Json(res);
    });
});