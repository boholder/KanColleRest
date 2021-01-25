import {ShipTypeDao} from "../../db/dao/ship-type.dao.js";
import {DatabaseQueryExecuteError} from "../../util/error";

test('query db with invalid id will throw DatabaseQueryExecuteError error', async () => {
    await expect(ShipTypeDao.getModelBy(-1))
        .rejects
        .toThrowError(DatabaseQueryExecuteError);
});

test.skip('query db and print one model', () => {
    return ShipTypeDao.getModelBy(1).then(value => {
        console.log(value);
    });
});