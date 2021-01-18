import {FieldEntityArray} from "../../src/model/simplified-field-entity";
import {mockedMainShipType, mockedShipType} from "../../src/model/example-model-instances";
import {MainShipType, ShipType} from "../../src/model/ship-type";

test('mocked ship type object dose not have raw id', () => {
    expect(mockedShipType.equipable_equipment).toBeInstanceOf(FieldEntityArray);
});

test('mocked main ship type object dose not have raw id', () => {
    expect(mockedMainShipType.subtype).toBeInstanceOf(FieldEntityArray);
});

test('ship type leak of value input handle', () => {
    let actual = new ShipType();
    expect(actual.code).toBe('');
    expect(actual.code_in_game).toBe('');
    expect(actual.transport_point).toBe(0);
    expect(actual.equipable_equipment).toBeInstanceOf(FieldEntityArray)
})

test('main ship type leak of value input handle', () => {
    let actual = new MainShipType();
    expect(actual.subtype).toBeInstanceOf(FieldEntityArray)
})