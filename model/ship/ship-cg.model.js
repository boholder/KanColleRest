import config from 'config';
import {ConfigUtil} from "../../util/config-util.js";

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

    // TODO unfinished yet
    constructor({id}) {
        this.ship_id = id;
        this.normal = {};
        this.normal.banner = urlURI + '0';
        this.normal.banner_dmged = urlURI + '1';
        this.normal.card = urlURI + '2';
        this.normal.card_dmged = urlURI + '3';
        this.normal.no_contour = urlURI + '8';
        this.normal.no_contour_dmged = urlURI + '9';
    }

    static #getCgQueryUrl(shipId, cgId) {
        // http://localhost:3000/v1/ship-cg?shipid={shipId}&cgid={cgId}
        return `${this.#urlPrefix}?${this.#shipIdParam}=${shipId}&${this.#cgIdParam}=${cgId}`;
    }

}