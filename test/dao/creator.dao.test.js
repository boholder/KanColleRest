import {CreatorDao} from "../../db/dao/creator.dao.js";

test('handle db query encounter error', () => {
    return CreatorDao.getModelBy(-1).then(value => {
        expect(value).toBeTruthy();
    })
});

test.skip('query db and print one model', () => {
    return CreatorDao.getModelBy(1).then(value => {
        console.log(value);
    });
});