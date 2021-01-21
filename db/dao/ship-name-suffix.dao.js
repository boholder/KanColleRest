import {buildDbCreationOptionWith, Datastore, DB_FILE_NAME, getOneById} from "../database-util.js";

const shipNameSuffixDb = Datastore.create(
    buildDbCreationOptionWith(DB_FILE_NAME.ship_name_suffix)
);

async function getShipNameSuffixBy(id) {
    // not map to model, only ShipNameModel use it.
    return getOneById(shipNameSuffixDb, id, {_id: 0});
}

export {getShipNameSuffixBy};