import {exampleDismantlingGain} from "./mocks/example-model-instances";
import {FieldEntityArray} from "../../../db/model/simplified-field-entity.model";
import {CreatorModel} from "../../../db/model/creator.model";
import {DismantlementGainModel} from "../../../db/model/dismantlement-gain.model";

test('build from falsy input will get default field values', () => {
    let obj = DismantlementGainModel.build();
    expect(obj.ammo).toBe(0);
    expect(obj.fuel).toBe(0);
    expect(obj.bauxite).toBe(0);
    expect(obj.steel).toBe(0);
});