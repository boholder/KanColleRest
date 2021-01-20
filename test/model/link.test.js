import {LinkModel} from "../../model/link.model";

test('leak of value input handle', () => {
    let actual = new LinkModel();
    expect(actual.name).toBe('');
    expect(actual.url).toBe('');
})