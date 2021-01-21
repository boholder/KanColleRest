import {getCreatorBy} from "../../db/dao/creator.dao.js";

test('handle db query encounter error', () => {
    return getCreatorBy(-1).then(value => {
        expect(value).toEqual({});
    })
});

test.skip('query db and print one model', () => {
    return getCreatorBy(1).then(value => {
        console.log(value);
    });
});