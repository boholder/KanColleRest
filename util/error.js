class BaseError extends Error {
    constructor(staticMessage, innerError = undefined) {
        super(staticMessage);
        this.name = "BaseError";
        this.inner = innerError || {
            toString() {
                return `no inner error`
            }
        };
    }

    /*
    return '[error name]: [message]: [additionalToString()] inner: [innerError.toString()], stack: [call stack]'
     */
    toString() {
        return `${this.baseToString()} ${this.additionalToString()} 
                    ${this.innerErrorAndStackToString()}`;
    }

    baseToString() {
        return `${this.name}:${this.message}:`;
    }

    additionalToString() {
        return ``;
    }

    innerErrorAndStackToString() {
        return `inner:${this.inner.toString()}, stack:${this.inner.stack || this.stack}`;
    }
}

export class DatabaseQueryExecuteError extends BaseError {
    constructor(databaseName, innerError = undefined) {
        super("Error occurred when executing query", innerError);
        this.name = 'DatabaseQueryExecuteError';
        this.db = databaseName;
    }

    additionalToString() {
        return `db name:${this.db},`;
    }
}

export class DatabaseQueryExecuteNoResultError extends DatabaseQueryExecuteError {
    constructor(databaseName, query, innerError = undefined) {
        super(databaseName, innerError);
        this.message = "query get nothing";
        this.name = 'DatabaseQueryExecuteNoResultError';
        this.query = query;
    }

    additionalToString() {
        return `db name:${this.db}, query:${JSON.stringify(this.query)},`;
    }
}

export class DatabaseQueryExecuteFailError extends DatabaseQueryExecuteError {
    constructor(databaseName, query, innerError = undefined) {
        super(databaseName, innerError);
        this.message = "query rejected by nedb";
        this.name = 'DatabaseQueryExecuteFailError';
        this.query = query;
    }

    additionalToString() {
        return `db name:${this.db}, query:${JSON.stringify(this.query)},`;
    }
}

export class DatabaseQueryFormatError extends BaseError {
    constructor(query, innerError = undefined) {
        super("Invalid query option", innerError);
        this.name = 'DatabaseQueryFormatError';
        this.invalidQuery = query;
    }

    additionalToString() {
        return `query(or id):${JSON.stringify(this.invalidQuery)},`
    }
}

export class ModelBuildError extends BaseError {
    constructor(modelClassName, innerError = undefined) {
        super("Building process isn't goes normally", innerError);
        this.name = 'ModelBuildError';
        this.model = modelClassName;
    }

    additionalToString() {
        return `model name:${this.model},`
    }
}

export class DatabaseInitializingError extends BaseError {
    constructor(wantedDatabasePath, innerError = undefined) {
        super("Error occurred when initializing database", innerError);
        this.name = "DatabaseInitializingError";
        this.wantedDb = wantedDatabasePath;
    }

    additionalToString() {
        return `wanted db path:${this.wantedDb},`
    }
}

export class ImageSendingError extends BaseError {
    constructor(imagePath, innerError = undefined) {
        super('Error occurred when sending a image response', innerError);
        this.name = 'ImageSendingError';
        this.imagePath = imagePath;
    }

    additionalToString() {
        return `image path:${this.imagePath},`
    }
}