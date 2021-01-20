class BaseError extends Error {
    constructor(message, staticMessage) {
        super(message);
        this.name = "BaseError";
        this.reason = staticMessage;
    }

    toString() {
        return this.name + ": " + this.reason + ": " + this.message;
    }
}

class DatabaseQueryExecuteError extends BaseError {
    constructor(databaseName, message) {
        super(message, "Encounter error when querying database");
        this.name = 'DatabaseQueryExecuteError';
        this.db = databaseName;
    }
}

class DatabaseQueryFormatError extends BaseError {
    constructor(id) {
        super(id, "Invalid id when building query json");
        this.name = 'DatabaseQueryFormatError';
    }
}

class ModelBuildError extends BaseError {
    constructor(modelClassName, message) {
        super(message, "Building process isn't goes normally");
        this.name = 'ModelBuildError';
        this.model = modelClassName;
    }

    toString() {
        return this.name + ": " +
            this.model + " " + this.reason + ": "
            + this.message;
    }
}

export {BaseError, DatabaseQueryExecuteError, DatabaseQueryFormatError, ModelBuildError};