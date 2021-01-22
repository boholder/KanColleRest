import {ShipCgRouteUtil} from "../../route/util/ship-cg-route.util.js";
import {ShipSeasonalCgModel} from "./ship-seasonal-cg.model";

/*
Part of ShipModel, contains ship's CG & seasonal CG api query urls.
 */
class ShipCgModel {
    constructor({id, illust_extra} = {}) {
        this.ship_id = id;
        this.normal = this.#concatNormalCgUrls();
        delete this.ship_id;
        this.seasonal = illust_extra || [];
    }

    #concatNormalCgUrls() {
        return {
            banner: this.#concatCgUrl('n0'),
            banner_masked: this.#concatCgUrl('n0-1'),
            banner_dmged: this.#concatCgUrl('n1'),
            banner_dmged_masked: this.#concatCgUrl('n1-1'),
            card: this.#concatCgUrl('n2'),
            card_dmged: this.#concatCgUrl('n3'),
            whole_body: this.#concatCgUrl('n8'),
            whole_body_dmged: this.#concatCgUrl('n9'),
            head_masked: this.#concatCgUrl('n10'),
            head_dmged_masked: this.#concatCgUrl('n11')
        }
    }

    #concatCgUrl(cgId) {
        return ShipCgRouteUtil.concatUrlWith(this.ship_id, cgId);
    }

    static async build(ship = {}) {
        if (ship.illust_extra) {
            ship.illust_extra = await ShipSeasonalCgModel.buildModelArrayFromShip(ship);
        }
        return new ShipCgModel(ship);
    }
}

export {ShipCgModel};