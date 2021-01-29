import {LinkModel} from "../../../db/model/link.model";

test('build from falsy input will get default field values', () => {
    let actual = LinkModel.build();
    expect(actual.name).toBe('');
    expect(actual.url).toBe('');
    let array = LinkModel.buildLinkArray();
    expect(array).toEqual([]);
})