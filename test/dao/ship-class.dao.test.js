import {getShipClassBy} from "../../db/dao/ship-class.dao.js";

test('handle db query encounter error', () => {
    return getShipClassBy(-1).then(value => {
        expect(value).toBeTruthy();
    })
});

test('query db and print one model', () => {
    return getShipClassBy(2).then(value => {
        console.log(value);
    });
});