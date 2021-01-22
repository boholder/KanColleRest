import {getEquipmentBy, getEquipmentIdNameBy} from "../../db/dao/equipment.dao.js";

test('handle db query encounter error', () => {
    return getEquipmentBy(-1).then(value => {
        expect(value).toBeTruthy();
    })
});

test('query db and print one instance', () => {
    return getEquipmentBy(1).then(value => {
        console.log(value);
    });
});

test('query db and print one id-name instance', () => {
    return getEquipmentIdNameBy(1).then(value => {
        console.log(value);
    });
});