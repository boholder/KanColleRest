import {ShipClassModel} from "../../model/ship/ship-class.model";
import {FieldEntityArray} from "../../model/simplified-field-entity.model";
import {mockedShipClass} from "../../model/example-model-instances";

test('leak of value handle', () => {
    let actual = new ShipClassModel();
    expect(actual.speed_rank).toBeNaN();
    expect(actual.speed_rule).toBe('');
    expect(actual.speed_type).toBe('');
    expect(actual.type).toBeInstanceOf(FieldEntityArray);
})

test('mocked object has no raw id', () => {
    expect(mockedShipClass.type).toBeInstanceOf(FieldEntityArray);
})