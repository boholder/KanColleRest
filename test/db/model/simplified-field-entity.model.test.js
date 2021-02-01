import {FieldEntityArray, SimplifiedFieldEntityModel} from "../../../db/model/simplified-field-entity.model";
import {NameModel} from "../../../db/model/name.model";

test('build SimplifiedFieldEntityModel from falsy input will get default values', () => {
    let actual = SimplifiedFieldEntityModel.build();
    expect(actual.id).toBeNaN();
    expect(actual.name).toBeInstanceOf(NameModel);
})

test('build FieldEntityArray from falsy input will get default values', () => {
    let actual = FieldEntityArray.buildModelFromEntityArray();
    expect(actual.id).toBeInstanceOf(Array);
    expect(actual.name.ja_jp).toBeInstanceOf(Array);
    expect(actual.name.zh_cn).toBeInstanceOf(Array);
    expect(actual.name.en_us).toBeInstanceOf(Array);
})