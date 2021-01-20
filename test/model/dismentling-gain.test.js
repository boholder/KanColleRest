import {mockedDismantlingGain} from "../../model/example-model-instances";
import {FieldEntityArray} from "../../model/simplified-field-entity.model";
import {CreatorModel} from "../../model/creator.model";
import {DismantlingGainModel} from "../../model/dismantling-gain.model";

test('leak of value input handle', () => {
    let actual = new DismantlingGainModel();
    expect(actual.ammo).toBeNaN();
});