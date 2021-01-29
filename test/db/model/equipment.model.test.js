import {exampleEquipment} from "./mocks/example-model-instances";
import {NameModel} from "../../../db/model/name.model";
import {EquipmentModel} from "../../../db/model/equipment.model";

test.skip('build & print example object', () => {
    return exampleEquipment.then(value => {
        console.log(value);
    })
});

test('build from falsy input will get default field values', () => {
    return EquipmentModel.build().then(actual => {
        expect(actual.id).toBe(undefined);
        expect(actual.name).toBeInstanceOf(NameModel);
    })
});