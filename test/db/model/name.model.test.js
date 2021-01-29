import {NameModel} from '../../../db/model/name.model.js';

test('Name ja_jp -> ja_romaji -> en_us value convert', () => {
    let name = {
        ja_jp: "test"
    }
    expect(new NameModel(name).en_us).toBe('Test');
});

test('build from falsy input will get default field values', () => {
    let actual = NameModel.build();
    expect(actual.en_us).toBe('');
    expect(actual.ja_jp).toBe('');
    expect(actual.zh_cn).toBe('');
});
