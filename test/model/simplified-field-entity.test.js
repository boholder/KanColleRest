import {FieldEntityArray} from "../../src/model/simplified-field-entity";

test('SimplifiedFieldEntity leak of value handle', () => {
    let actual = new FieldEntityArray();
    expect(actual.id).toBeInstanceOf(Array);
    expect(actual.name.ja_jp).toBeInstanceOf(Array);
})