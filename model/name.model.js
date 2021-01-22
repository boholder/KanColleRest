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

    static build(name = {}) {
        return new NameModel(name);
    }
}

export {NameModel};