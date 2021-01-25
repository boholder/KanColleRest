import {ShipNameSuffixDao} from "../../db/dao/ship-name-suffix.dao.js";
import {DatabaseQueryExecuteError} from "../../util/error.js";

test('query db with invalid id will throw DatabaseQueryExecuteError error', async () => {
    await expect(ShipNameSuffixDao.getModelBy(-1))
        .rejects
        .toThrowError(DatabaseQueryExecuteError);
});

test('query db and print one instance', () => {
    return ShipNameSuffixDao.getModelBy(1).then(value => {
        console.log(value);
    });
});