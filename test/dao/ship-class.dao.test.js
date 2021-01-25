import {ShipClassDao} from "../../db/dao/ship-class.dao.js";
import {DatabaseQueryExecuteError} from "../../util/error";

test('query db with invalid id will throw DatabaseQueryExecuteError error', async () => {
    await expect(ShipClassDao.getModelBy(-1))
        .rejects
        .toThrowError(DatabaseQueryExecuteError);
});

test('query db and print one model', () => {
    return ShipClassDao.getModelBy(2).then(value => {
        console.log(value);
    });
});