import {EquipmentDao} from "../../../db/dao/equipment.dao.js";

test.skip('query db and print one instance', () => {
    return EquipmentDao.getModelBy(1).then(value => {
        console.log(value);
    });
});