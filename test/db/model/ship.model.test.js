import {ShipModel} from "../../../db/model/ship.model";
import {ModelBuildError} from "../../../util/error";
import {exampleShipModelJson} from "./mocks/example-model-instances";

// How come compiler won't perform deep copy when use JSON in jest?
// exampleShipModelJson will assigned to shipJson
//      if use jest beforeEach() and afterEach() methods to reset shipJson.
// let mockShipJson;
// beforeEach(() => {
//     let temp = JSON.stringify(exampleShipModelJson);
//     let showValueOnDbg = mockShipJson;
//     mockShipJson = JSON.parse(temp);
//     let showItAgain = mockShipJson;
// })

const shipJson1 = JSON.parse(JSON.stringify(exampleShipModelJson));
const shipJson2 = JSON.parse(JSON.stringify(exampleShipModelJson));

describe('build() method', () => {
    it('rejects with ModelBuildError when param is invalid', async () => {
        await expect(ShipModel.build({}))
            .rejects.toThrowError(ModelBuildError);
    })

    it('logs and rejects with ModelBuildError' +
        ' when error occurred when building', async () => {
        await expect(ShipModel.build({id: 'throw_database_error_by_field_model_dao'}))
            .rejects.toThrowError(ModelBuildError);
    })
})

describe('buildModelArrayFrom() method', () => {
    it('rejects rejects with error', async () => {
        await expect(ShipModel.buildModelArrayFrom(
            [{id: "throw_database_error_by_field_model_dao"}]))
            .rejects.toThrowError(ModelBuildError);
    })
})