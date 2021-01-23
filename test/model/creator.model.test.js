import {FieldEntityArray} from "../../model/simplified-field-entity.model";
import {CreatorModel} from "../../model/creator.model";
import {mockedCreator} from "../../model/example-model-instances";

test('mocked object dose not have raw id', () => {
    return mockedCreator.then(value => {
        expect(value.relative_ships).toBeInstanceOf(FieldEntityArray);
    })
});

test('leak of value input handle', () => {
    return CreatorModel.buildModel().then((actual) => {
        expect(actual.profession).toBe('');
        expect(actual.name.zh_cn).toBe('');
        expect(actual.relative_ships).toBeInstanceOf(Array);
    })
});