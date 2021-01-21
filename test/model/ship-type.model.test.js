import {FieldEntityArray} from "../../model/simplified-field-entity.model";
import {mockedMainShipType, mockedShipType} from "../../model/example-model-instances";
import {MainShipTypeModel, ShipTypeModel} from "../../model/ship-type.model";

test('mocked ship type object dose not have raw id', () => {
    expect(mockedShipType.equipable_equipment).toBeInstanceOf(FieldEntityArray);
});

test('mocked main ship type object dose not have raw id', () => {
    expect(mockedMainShipType.subtype).toBeInstanceOf(FieldEntityArray);
});

test('ship type leak of value input handle', () => {
    let actual = new ShipTypeModel();
    expect(actual.code).toBe('');
    expect(actual.code_in_game).toBe('');
    expect(actual.transport_point).toBe(0);
    expect(actual.equipable_equipment).toBeInstanceOf(FieldEntityArray)
})

test('main ship type leak of value input handle', () => {
    let actual = new MainShipTypeModel();
    expect(actual.subtype).toBeInstanceOf(FieldEntityArray)
})