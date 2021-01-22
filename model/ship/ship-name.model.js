/*
Ship name has special suffix.
 */
import {ShipNameSuffixDao} from "../../db/dao/ship-name-suffix.dao.js";
import {NameModel} from "../name.model.js";
import {ShipNameSuffixModel} from "./ship-name-suffix.model.js";

class ShipNameModel extends NameModel {
    constructor({
                    ja_jp, ja_kana, ja_romaji, zh_cn,
                    en_us, suffix
                } = {}) {

        super({ja_jp, ja_kana, ja_romaji, zh_cn, en_us});
        this.#addNameSuffixToFields(suffix);
    }

    #addNameSuffixToFields(suffix = {}) {
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
        shipName.suffix = await ShipNameSuffixDao.getModelBy(shipName.suffix);
        return new ShipNameModel(shipName);
    }

}

export {ShipNameModel};