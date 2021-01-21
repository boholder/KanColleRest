import {getShipBy} from "../../db/dao/ship.dao.js";

test('handle db query encounter error', () => {
    return getShipBy(-1).then(value => {
        expect(value).toEqual({});
    })
});

test('query db and print one instance', () => {
    return getShipBy(1).then(value => {
        console.log(value);
    });
});