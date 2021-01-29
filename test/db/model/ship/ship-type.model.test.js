import {FieldEntityArray} from "../../../../db/model/simplified-field-entity.model";
import {exampleMainShipType} from "../mocks/example-model-instances";
import {ShipTypeModel} from "../../../../db/model/ship/ship-type.model";

test('build from falsy input will get default values', () => {
    return ShipTypeModel.build().then((actual) => {
        expect(actual.code).toBe('');
        expect(actual.code_in_game).toBe('');
        expect(actual.transport_point).toBe(0);
        expect(actual.equipable_equipments).toBeInstanceOf(FieldEntityArray);
    });
})