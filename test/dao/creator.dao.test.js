import {CreatorDao} from "../../db/dao/creator.dao.js";
import {DatabaseQueryExecuteError} from "../../util/error.js";

test('query db with invalid id will throw DatabaseQueryExecuteError error', async () => {
    await expect(CreatorDao.getModelBy(-1))
        .rejects
        .toThrowError(DatabaseQueryExecuteError);
});

test.skip('query db and print one model', () => {
    return CreatorDao.getModelBy(1).then(value => {
        console.log(value);
    });
});