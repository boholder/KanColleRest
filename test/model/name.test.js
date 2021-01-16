import {Name, ShipName} from '../../src/model/name.js';

test('ja_romaji -> en_us value convert', () => {
    let name = {
        ja_romaji: "test"
    }
    expect(new Name(name).en_us).toBe('Test');
});

test('Name leak of value input handle', () => {
    let name = {}
    let actual = new Name(name);
    expect(actual.en_us).toBe('')
    expect(actual.ja_jp).toBe('')
    expect(actual.ja_kana).toBe('')
    expect(actual.zh_cn).toBe('')
});

test('ShipName leak of value input handle', () => {
    let name = {}
    let actual = new ShipName(name);
    expect(actual.en_us).toBe('')
    expect(actual.ja_jp).toBe('')
    expect(actual.ja_kana).toBe('')
    expect(actual.zh_cn).toBe('')
});