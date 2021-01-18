/*
URL for detail information about ships, creators...
 */
class Link {
    constructor(name, url) {
        this.name = name || '';
        this.url = url || '';
    }

    static buildLinkArray(linkArray = []) {
        let array = [];
        for (let link of linkArray) {
            array.push(new Link(link.name, link.url));
        }
        return array;
    }
}

export {Link}