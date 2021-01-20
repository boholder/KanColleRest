import {getCreatorBy} from "../../db/dao/creator.dao.js";

test('handle db query encounter error', () => {
    return getCreatorBy(-1).then(value => {
        expect(value).toEqual({});
    })
});

// TODO get simple ship name & id
test('query db and print one instance', () => {
    return getCreatorBy(1).then(value => {
        console.log(value);
    });
});