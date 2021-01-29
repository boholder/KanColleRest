import {ShipClassModel} from "../../../../db/model/ship/ship-class.model";
import {FieldEntityArray} from "../../../../db/model/simplified-field-entity.model";

test('build from falsy input will get default values', () => {
    let actual = new ShipClassModel();
    expect(actual.speed_rank).toBeNaN();
    expect(actual.speed_rule).toBe('');
    expect(actual.speed_type).toBe('');
    expect(actual.type).toBeInstanceOf(FieldEntityArray);
})