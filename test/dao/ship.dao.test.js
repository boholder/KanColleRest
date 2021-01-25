import {ShipDao} from "../../db/dao/ship.dao.js";
import {DatabaseQueryExecuteError} from "../../util/error";

test('query db with invalid id will throw DatabaseQueryExecuteError error', async () => {
    await expect(ShipDao.getModelBy(-1))
        .rejects
        .toThrowError(DatabaseQueryExecuteError);
});

test('query db and print one instance', () => {
    return ShipDao.getModelBy(2).then(value => {
        console.log(value);
    });
});

test('query db and print one id-name instance', () => {
    return ShipDao.getIdNameBy(1).then(value => {
        console.log(value);
    });
});