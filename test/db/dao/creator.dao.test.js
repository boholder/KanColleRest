import {CreatorDao} from "../../../db/dao/creator.dao.js";

test.skip('query db and print one model', () => {
    return CreatorDao.getModelBy(1).then(value => {
        console.log(value);
    });
});