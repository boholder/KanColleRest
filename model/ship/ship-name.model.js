import {ShipNameSuffixDao} from "../../db/dao/ship-name-suffix.dao.js";
import {NameModel} from "../name.model.js";
import {ModelBuildError} from "../util/error.js";
import {logger} from "../../config/winston-logger.js";

/*
Ship name has special suffix.
 */
class ShipNameModel extends NameModel {
    constructor({
                    ja_jp, ja_romaji, zh_cn, ja_kana,
                    en_us, suffix
                } = {}) {

        super({ja_jp, ja_romaji, zh_cn, en_us});
        this.ja_kana = ja_kana;
        if (suffix) {
            this.#addNameSuffixToNames(suffix);
        }
    }

    #addNameSuffixToNames(suffix = {}) {
        this.ja_jp = this.#appendSuffixDependsOn(this.ja_jp, suffix.ja_jp);
        this.ja_kana = this.#appendSuffixDependsOn(this.ja_kana, suffix.ja_jp);
        this.zh_cn = this.#appendSuffixDependsOn(this.zh_cn, suffix.zh_cn);
        this.en_us = this.#appendSuffixDependsOn(this.en_us, suffix.ja_romaji);
    }

    #appendSuffixDependsOn(field, suffix) {
        if (field) {
            if (suffix) {
                return field + suffix;
            } else {
                this.name_is_ok_but_suffix_cant_appended_on = true;
                return field;
            }
        } else {
            return '';
        }
    }

    static async build(shipName = {}) {
        try {
                    return await this.buildModel(shipName);
        }catch (e) {
            logger.error(
                new ModelBuildError('ShipNameModel', e).toString()
            );
            return new ShipNameModel();
        }
    }

    static async buildModel(shipName) {
        if (shipName.suffix) {
            shipName.suffix = await ShipNameSuffixDao.getModelBy(shipName.suffix);
        }
        return new ShipNameModel(shipName);
    }
}

export {ShipNameModel};