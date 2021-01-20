import {FieldEntityArray} from "../../model/simplified-field-entity.model";
import {CreatorModel} from "../../model/creator.model";
import {mockedCreator} from "../../model/example-model-instances";

test('mocked object dose not have raw id', () => {
    let actual = mockedCreator;
    expect(actual.relative_ships).toBeInstanceOf(FieldEntityArray);
});

test('leak of value input handle', () => {
    let actual = new CreatorModel();
    expect(actual.profession).toBe('');
    expect(actual.name.zh_cn).toBe('');
    expect(actual.relative_ships).toBeInstanceOf(Array);
});