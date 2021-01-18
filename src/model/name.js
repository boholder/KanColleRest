class Name {
    constructor({
                    ja_jp, zh_cn, ja_kana, ja_romaji, en_us
                } = {}) {

        this.ja_jp = ja_jp || '';
        this.ja_kana = ja_kana || '';
        this.zh_cn = zh_cn || '';
        let romaji = ja_romaji ? this.changeStringFirstLetterToUpperCase(ja_romaji) : '';
        this.en_us = en_us || romaji;
    }

    changeStringFirstLetterToUpperCase(origin) {
        return origin.charAt(0).toUpperCase() + origin.slice(1);
    }
}

/*
Ship name has special suffix.
 */
class ShipName extends Name {
    constructor({
                    ja_jp, ja_kana, ja_romaji, zh_cn,
                    en_us, suffix
                }) {

        super({ja_jp, ja_kana, ja_romaji, zh_cn, en_us});
        this.addNameSuffixToFields(suffix);
    }

    addNameSuffixToFields(suffix) {
        this.ja_jp = this.ja_jp ? this.ja_jp + suffix.ja_jp : '';
        this.ja_kana = this.ja_kana ? this.ja_kana + suffix.ja_romaji : '';
        this.zh_cn = this.zh_cn ? this.zh_cn + suffix.zh_cn : '';
        this.en_us = this.en_us ? this.en_us + ' ' + suffix.ja_romaji : '';
    }
}

const exampleShipNameJson = {
    "ja_jp": "村雨",
    "ja_kana": "むらさめ",
    "ja_romaji": "murasame",
    "zh_cn": "村雨",
    "en_us": "",
    "suffix": 1
};

const exampleShipNameSuffixJson = {
    "ja_jp": "改",
    "ja_romaji": "Kai",
    "zh_cn": "改",
    "id": 1,
    "_id": "1P6WM4aDPXQUpZP0"
};
// query suffix object from ship_namesuffix.nedb
exampleShipNameJson.suffix = exampleShipNameSuffixJson;
const mockedShipName = new ShipName(exampleShipNameJson);

export {mockedShipName, Name, ShipName};