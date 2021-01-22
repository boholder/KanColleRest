import {EquipmentDao} from "../../db/dao/equipment.dao.js";

test('handle db query encounter error', () => {
    return EquipmentDao.getModelBy(-1).then(value => {
        expect(value).toBeTruthy();
    })
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