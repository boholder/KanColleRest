import {FieldEntityArray} from "../../model/simplified-field-entity.model";
import {mockedCreators} from "../../model/ship.model";

test('mocked Creators object dose not have raw id', () => {
    let actual = mockedCreators;
    expect(actual.cv).toBeInstanceOf(FieldEntityArray);
    expect(actual.illustrator).toBeInstanceOf(FieldEntityArray);
});