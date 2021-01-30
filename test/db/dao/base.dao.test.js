import {BaseDao, DB_FILE_NAME} from "../../../db/dao/base.dao.js";
import {
    DatabaseInitializingError,
    DatabaseQueryExecuteFailError,
    DatabaseQueryExecuteNoResultError,
    DatabaseQueryFormatError
} from "../../../util/error";

class WrongDao extends BaseDao {
    // fs.existsSync() will return true if space character in path.
    // It's ridiculous.
    static triggerCall() {
        super.initDatastoreWith('not_exist_db_name');
    }
}

test('wrongly initializing database will throw DatabaseInitializingError', () => {
    // this error will be thrown in production,
    // when Dao instance initializing it's static fields (when starting server),
    // so that server will not start in a corrupted state.
    expect(() => {
        WrongDao.triggerCall();
    }).toThrowError(DatabaseInitializingError);
})

const mockDatastore = {
    __original: {filename: 'test.nedb'},
    findOne: jest.fn((query, projection) => {
        if (query.id === 1) {
            return Promise.resolve(null);
        } else if (query.id === 2) {
            return Promise.reject('test reason');
        } else if (query.id === 3) {
            return Promise.resolve('result');
        }
    }),
    find: jest.fn((query, projection) => {
        if (query.id === 1) {
            return Promise.resolve([]);
        } else if (query.id === 2) {
            return Promise.reject('test reason');
        } else if (query.id === 3) {
            return Promise.resolve(['a', 'b']);
        }
    })
}

class TestDao extends BaseDao {
    static #callInit = super.initDatastoreWith(DB_FILE_NAME.ship);
    static datastore = mockDatastore;

    static async getOneBy(id) {
        return super.getOneById(id, {_id: 0});
    }

    static async getManyBy(query) {
        return super.getManyByQuery(query, {_id: 0});
    }
}

describe('getOneById method should:', () => {
    it('rejects with DatabaseQueryFormatError to falsy query option', async () => {
        await expect(TestDao.getOneBy(null))
            .rejects.toThrowError(DatabaseQueryFormatError);
    });

    it('rejects with DatabaseQueryExecuteNoResultError when matches nothing', async () => {
        await expect(TestDao.getOneBy(1))
            .rejects.toThrowError(DatabaseQueryExecuteNoResultError);
    })

    it('rejects with DatabaseQueryExecuteFailError when nedb rejects query', async () => {
        await expect(TestDao.getOneBy(2))
            .rejects.toThrowError(DatabaseQueryExecuteFailError);
    })

    it('resolves with result when matches result', async () => {
        await expect(TestDao.getOneBy(3))
            .resolves.toBe('result');
    })
})

describe('getManyByQuery method should handle abnormal query result', () => {
    it('rejects with DatabaseQueryFormatError to falsy query option', async () => {
        await expect(TestDao.getManyBy(null))
            .rejects.toThrowError(DatabaseQueryFormatError);
    });

    it('rejects with DatabaseQueryExecuteNoResultError when matches nothing', async () => {
        await expect(TestDao.getManyBy({id: 1}))
            .rejects.toThrowError(DatabaseQueryExecuteNoResultError);
    })

    it('rejects with DatabaseQueryExecuteFailError when nedb rejects query', async () => {
        await expect(TestDao.getManyBy({id: 2}))
            .rejects.toThrowError(DatabaseQueryExecuteFailError);
    })

    it('resolves with result when matches result', async () => {
        await expect(TestDao.getManyBy({id: 3}))
            .resolves.toEqual(['a', 'b']);
    })
})