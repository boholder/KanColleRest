import {FieldEntityArray} from "../../src/model/simplified-field-entity";
import {mockedEquipType} from "../../src/model/example-model-instances";
import {EquipmentType} from "../../src/model/equipment-type";

test('mocked object dose not have raw id', () => {
    let actual = mockedEquipType;
    expect(actual.equipable_ships).toBeInstanceOf(FieldEntityArray);
    expect(actual.equipable_ship_types).toBeInstanceOf(FieldEntityArray);
});

test('leak of value input handle', () => {
    let actual = new EquipmentType();
    expect(actual.equipable_ship_types).toBeInstanceOf(FieldEntityArray);
    expect(actual.id_in_game).toBe(NaN);
    expect(actual.main_attribute).toBe('');
    expect(actual.transport_point).toBe(0);
});