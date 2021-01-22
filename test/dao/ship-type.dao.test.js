import {getShipTypeBy} from "../../db/dao/ship-type.dao.js";

test('handle db query encounter error', () => {
    return getShipTypeBy(-1).then(value => {
        expect(value).toBeTruthy();
    })
});

test.skip('query db and print one model', () => {
    return getShipTypeBy(1).then(value => {
        console.log(value);
    });
});