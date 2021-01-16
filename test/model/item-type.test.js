import {mockedItemType} from "../../src/model/item-type";
import {FieldEntityArray} from "../../src/model/simplified-field-entity";

test('mocked item type object dose not have raw id', () => {
    let actual = mockedItemType;
    expect(actual.equipable_ships).toBeInstanceOf(FieldEntityArray);
    expect(actual.equipable_ship_types).toBeInstanceOf(FieldEntityArray);
});