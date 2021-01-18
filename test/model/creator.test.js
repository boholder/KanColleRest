import {FieldEntityArray} from "../../src/model/simplified-field-entity";
import {Creator} from "../../src/model/creator";
import {mockedCreator} from "../../src/model/example-model-instances";

test('mocked object dose not have raw id', () => {
    let actual = mockedCreator;
    expect(actual.ships_created).toBeInstanceOf(FieldEntityArray);
});

test('leak of value input handle', () => {
    let actual = new Creator();
    expect(actual.profession).toBe('');
    expect(actual.name.zh_cn).toBe('');
    expect(actual.ships_created).toBeInstanceOf(Array);
});