import {FieldEntityArray} from "../../src/model/simplified-field-entity";
import {mockedMainShipType, mockedShipType} from "../../src/model/ship-type";

test('mocked ship type object dose not have raw id', () => {
    expect(mockedShipType.equipable_equipment).toBeInstanceOf(FieldEntityArray);
});

test('mocked main ship type object dose not have raw id', () => {
    expect(mockedMainShipType.subtype).toBeInstanceOf(FieldEntityArray);
});