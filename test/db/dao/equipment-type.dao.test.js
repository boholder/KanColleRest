import {EquipmentTypeDao} from "../../../db/dao/equipment-type.dao.js";

test.skip('query db and print one instance', () => {
    return EquipmentTypeDao.getModelBy(1).then(value => {
        console.log(value);
    });
});