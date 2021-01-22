import {mockedDismantlingGain} from "../../model/example-model-instances";
import {FieldEntityArray} from "../../model/simplified-field-entity.model";
import {CreatorModel} from "../../model/creator.model";
import {DismantlementGainModel} from "../../model/dismantlement-gain.model";

test('leak of value input handle', () => {
    let actual = new DismantlementGainModel();
    expect(actual.ammo).toBeNaN();
});