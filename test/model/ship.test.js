import {FieldEntityArray} from "../../src/model/simplified-field-entity";
import {mockedCreators} from "../../src/model/ship";

test('mocked Creators object dose not have raw id', () => {
    let actual = mockedCreators;
    expect(actual.cv).toBeInstanceOf(FieldEntityArray);
    expect(actual.illustrator).toBeInstanceOf(FieldEntityArray);
});