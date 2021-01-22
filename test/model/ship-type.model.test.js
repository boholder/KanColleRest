import {FieldEntityArray} from "../../model/simplified-field-entity.model";
import {mockedMainShipType, mockedShipType} from "../../model/example-model-instances";
import {ShipTypeModel} from "../../model/ship/ship-type.model";
import {MainShipTypeModel} from "../../model/ship/main-ship-type.model";

test('mocked ship type object dose not have raw id', () => {
    return mockedShipType.then(value => {
        expect(value.equipable_equipments).toBeInstanceOf(FieldEntityArray);
    });
});

test('ship type leak of value input handle', () => {
    return ShipTypeModel.build().then((actual) => {
        expect(actual.code).toBe('');
        expect(actual.code_in_game).toBe('');
        expect(actual.transport_point).toBe(0);
        expect(actual.equipable_equipments).toBeInstanceOf(FieldEntityArray);
    });
})

test('mocked main ship type object dose not have raw id', () => {
    return mockedMainShipType.then(value => {
        expect(value.subtype).toBeInstanceOf(FieldEntityArray);
    });
});

test('main ship type leak of value input handle', () => {
    return ShipTypeModel.build().then((actual) => {
        expect(actual.subtype).toBeInstanceOf(FieldEntityArray);
    });
})