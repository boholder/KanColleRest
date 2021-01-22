import config from 'config';
import {ConfigUtil} from "../../util/config-util.js";

/*
Part of ShipModel, contains ship's CG & seasonal CG api query urls.
 */
class ShipCgModel {
    static cgDirectory = config.get('resource.image.wctf_image_dir');
    static #apiConFigKeyPrefix = this.#concatApiConfigKeyPrefix();
    static #urlPrefix = this.#getUrlPrefix();
    static #shipIdParam = config.get(`${this.#apiConFigKeyPrefix}.ship_id`);
    static #cgIdParam = config.get(`${this.#apiConFigKeyPrefix}.cg_id`);

    static #concatApiConfigKeyPrefix() {
        // 'v1'
        let apiVersion = config.get('api.current');
        // 'api.v1.ship_cg'
        return 'api.' + apiVersion + 'ship_cg';
    }

    static #getUrlPrefix() {
        return ConfigUtil.concatApiUrl(`${this.#apiConFigKeyPrefix}.route`)
    }

    constructor({id, illust_extra} = {}) {
        this.ship_id = id;
        this.cg_urls = {normal: {}, seasonal: {}};
        this.cg_urls.normal.banner = this.#concatCgUrl(0);
        this.cg_urls.normal.banner_masked = this.#concatCgUrl('0-1');
        this.cg_urls.normal.banner_dmged = this.#concatCgUrl(1);
        this.cg_urls.normal.banner_dmged_masked = this.#concatCgUrl('1-1');
        this.cg_urls.normal.card = this.#concatCgUrl(2);
        this.cg_urls.normal.card_dmged = this.#concatCgUrl(3);
        this.cg_urls.normal.whole_body = this.#concatCgUrl(8);
        this.cg_urls.normal.whole_body_dmged = this.#concatCgUrl(9);
        this.cg_urls.normal.head_masked = this.#concatCgUrl(10);
        this.cg_urls.normal.head_dmged_masked = this.#concatCgUrl(11);

        this.cg_urls.seasonal
    }

    #concatCgUrl(cgId) {
        // http://localhost:3000/v1/ship-cg?shipid={shipId}&cgid={cgId}
        return `${this.#urlPrefix}?${this.#shipIdParam}=${this.ship_id}&${this.#cgIdParam}=${cgId}`;
    }

    static build(ship = {}) {
        return new ShipCgModel(ship);
    }
}