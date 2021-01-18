import {Link} from "../../src/model/link";

test('leak of value input handle', () => {
    let actual = new Link();
    expect(actual.name).toBe('');
    expect(actual.url).toBe('');
})