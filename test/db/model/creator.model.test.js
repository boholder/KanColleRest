import {CreatorModel} from "../../../db/model/creator.model";
import {exampleCreator} from "./mocks/example-model-instances";
import {FieldEntityArray} from "../../../db/model/simplified-field-entity.model";
import {NameModel} from "../../../db/model/name.model";

test.skip('build & print example object', () => {
    return exampleCreator.then(value => {
        console.log(value);
    })
});

test('build from falsy input with default field values', () => {
    return CreatorModel.build().then(actual => {
        expect(actual.id).toBe(undefined);
        expect(actual.profession).toBe('');
        expect(actual.relative_ships).toBeInstanceOf(FieldEntityArray);
        expect(actual.name).toBeInstanceOf(NameModel);
    })
});