import {getShipNameSuffixBy} from "../../db/dao/ship-name-suffix.dao.js";

test('handle ship name suffix db query encounter error', () => {
    return getShipNameSuffixBy(-1).then(value => {
        expect(value).toEqual({});
    })
});

test.skip('query db and print one instance', () => {
    return getShipNameSuffixBy(1).then(value => {
        console.log(value);
    });
});