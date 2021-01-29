import {FieldEntityArray} from "../../../db/model/simplified-field-entity.model";
import {exampleEquipType} from "./mocks/example-model-instances";
import {EquipmentTypeModel} from "../../../db/model/equipment-type.model";
import {NameModel} from "../../../db/model/name.model";

test.skip('example object dose not have raw id', () => {
    let actual = exampleEquipType;
    expect(actual.equipable_ships).toBeInstanceOf(FieldEntityArray);
    expect(actual.equipable_ship_types).toBeInstanceOf(FieldEntityArray);
});

test('build from falsy input will get default field values', () => {
    return EquipmentTypeModel.build().then(actual => {
            expect(actual.id).toBe(undefined);
            expect(actual.name).toBeInstanceOf(NameModel);
            expect(actual.equipable_ship_types).toBeInstanceOf(FieldEntityArray);
            expect(actual.main_attribute).toBe('');
            expect(actual.equipable_ships).toBeInstanceOf(FieldEntityArray);
            expect(actual.id_in_game).toBe(NaN);
            expect(actual.transport_point).toBe(0);
        }
    );
});