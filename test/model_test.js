"use strict";

import test from 'tape';
import Name from '../src/model/Name';

test('test Name model ja_romaji, en_us value convert', function (t) {
    let name = {
        "ja_romaji": "",
        "en_us": "test"
    }
    t.equal(new Name(name).ja_romaji, 'test', 'en_us -> jp_romaji');
    t.end()
});