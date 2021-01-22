import {ShipDao} from "../../db/dao/ship.dao.js";

test('handle db query encounter error', () => {
    return ShipDao.getModelBy(-1).then(value => {
        expect(value).toBeTruthy();
    })
});

test('query db and print one instance', () => {
    return ShipDao.getModelBy(1).then(value => {
        console.log(value);
    });
});

test('query db and print one id-name instance', () => {
    return ShipDao.getIdNameBy(1).then(value => {
        console.log(value);
    });
});