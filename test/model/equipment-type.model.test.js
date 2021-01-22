import {FieldEntityArray} from "../../model/simplified-field-entity.model";
import {mockedEquipType} from "../../model/example-model-instances";
import {EquipmentTypeModel} from "../../model/equipment-type.model";

test('mocked object dose not have raw id', () => {
    let actual = mockedEquipType;
    expect(actual.equipable_ships).toBeInstanceOf(FieldEntityArray);
    expect(actual.equipable_ship_types).toBeInstanceOf(FieldEntityArray);
});

test('leak of value input handle', () => {
    let actual = new EquipmentTypeModel();
    expect(actual.equipable_ship_types).toBeInstanceOf(FieldEntityArray);
    expect(actual.id_in_game).toBe(NaN);
    expect(actual.main_attribute).toBe('');
    expect(actual.transport_point).toBe(0);
});