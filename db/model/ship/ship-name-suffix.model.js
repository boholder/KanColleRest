class ShipNameSuffixModel {
    constructor({id, ja_jp, ja_romaji, zh_cn} = {}) {
        this.id = id;
        this.ja_jp = ja_jp;
        this.ja_romaji = ja_romaji;
        this.zh_cn = zh_cn;
    }

    static build(suffix = {}) {
        return new ShipNameSuffixModel(suffix);
    }
}

export {ShipNameSuffixModel};