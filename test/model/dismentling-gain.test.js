import {mockedDismantlingGain} from "../../src/model/example-model-instances";
import {FieldEntityArray} from "../../src/model/simplified-field-entity";
import {Creator} from "../../src/model/creator";
import {DismantlingGain} from "../../src/model/dismantling-gain";

test('leak of value input handle', () => {
    let actual = new DismantlingGain();
    expect(actual.ammo).toBeNaN();
});