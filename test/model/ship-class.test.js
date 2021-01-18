import {ShipClass} from "../../src/model/ship-class";
import {FieldEntityArray} from "../../src/model/simplified-field-entity";
import {mockedShipClass} from "../../src/model/example-model-instances";

test('leak of value handle', () => {
    let actual = new ShipClass();
    expect(actual.speed_rank).toBeNaN();
    expect(actual.speed_rule).toBe('');
    expect(actual.speed_type).toBe('');
    expect(actual.type).toBeInstanceOf(FieldEntityArray);
})

test('mocked object has no raw id', () => {
    expect(mockedShipClass.type).toBeInstanceOf(FieldEntityArray);
})