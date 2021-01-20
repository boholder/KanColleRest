import {FieldEntityArray} from "../../model/simplified-field-entity.model";

test('SimplifiedFieldEntityModel leak of value handle', () => {
    let actual = new FieldEntityArray();
    expect(actual.id).toBeInstanceOf(Array);
    expect(actual.name.ja_jp).toBeInstanceOf(Array);
})