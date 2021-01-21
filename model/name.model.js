import {getShipNameSuffixBy} from "../db/dao/ship-name-suffix.dao.js";

/*
This model is present for name field of ship girl, equipment...
    while name field is always recorded in multi-language.
 */
class NameModel {
    constructor({
                    ja_jp, zh_cn, ja_kana, ja_romaji, en_us
                } = {}) {

        this.ja_jp = ja_jp || '';
        this.ja_kana = ja_kana || '';
        this.zh_cn = zh_cn || '';
        // Specially, ship girl "U-511"
        // (name is constructed by english letter, while name.en_us not exists in ships.nedb)
        //      doesn't have both ja_romaji & en_us name.
        // So melt down en_us name of girls like her to take ja_jp name is a trick since they have
        //      ja_jp name and that value IS english.
        // Example: U-511: name.ja_jp: 'U-511', name.en_us: undefined, name.ja_romaji: 'U-511'
        let romaji = ja_romaji ? ja_romaji : this.ja_jp;
        romaji = this.changeStringFirstLetterToUpperCase(romaji);
        this.en_us = en_us || romaji;
    }

    changeStringFirstLetterToUpperCase(origin) {
        return origin.charAt(0).toUpperCase() + origin.slice(1);
    }
}

/*
Ship name has special suffix.
 */
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
                this.name_is_ok_but_suffix_got_error = true;
                return field;
            }
        } else {
            return '';
        }
    }

    static async build(shipName = {}) {
        let promise = await getShipNameSuffixBy(shipName.suffix);
        shipName.suffix = promise;
        return new ShipNameModel(shipName);
    }

}

export {NameModel, ShipNameModel};