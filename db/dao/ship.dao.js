import {buildDbCreationOptionWith, Datastore, DB_FILE_NAME, getOneById} from "../database-util.js";

const shipDb = Datastore.create(
    buildDbCreationOptionWith(DB_FILE_NAME.ship)
);

async function getShipBy(id) {
    return getOneById(shipDb, id);
}

async function getShipIdNameBy(id) {
    return getOneById(shipDb, id, {name: 1, id: 1});
}

export {shipDb, getShipBy, getShipIdNameBy};