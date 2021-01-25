import {EquipmentDao} from "../../db/dao/equipment.dao.js";
import {DatabaseQueryExecuteError} from "../../util/error";

test('query db with invalid id will throw DatabaseQueryExecuteError error', async () => {
    await expect(EquipmentDao.getModelBy(-1))
        .rejects
        .toThrowError(DatabaseQueryExecuteError);
});

test('query db and print one instance', () => {
    return EquipmentDao.getModelBy(1).then(value => {
        console.log(value);
    });
});

test('query db and print one id-name instance', () => {
    return EquipmentDao.getIdNameBy(1).then(value => {
        console.log(value);
    });
});