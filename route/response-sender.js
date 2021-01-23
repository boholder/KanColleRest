import fs from "fs";
import {logger} from "../config/winston-logger.js";
import {ImageSendingError} from "../util/error.js";

class ResponseSender {

    static sendJson(res, data) {
        res.json(data);
    }

    static tryToSendPng(res, imagePath) {
        try {
            let image = fs.readFileSync(imagePath);
            res.status(200).set({'Content-Type': 'image/png'});
            res.end(image, 'binary');
        } catch (error) {
            logger.error(new ImageSendingError(imagePath, error).toString());
            status()(res);
        }
    }

    static send404NotFound(res) {
        res.status(404).send(
            'Sorry, we cannot find appropriate response!\n' +
            '\t\t\\\n' +
            '_____cat____prostrating-girl______');
    }

    static send204NoContent(res) {
        res.status(204).end();
    }

    static send409Conflict(res, explainMessage) {
        res.status(409).send(explainMessage);
    }

    static send500InternalServerError(res) {
        res.status(500).end(
            'Internal server error happened, ' +
            'tell the server administrator to check log or ' +
            'report it as an issue on project issue page: ' +
            'https://github.com/boholder/KanColleREST/issues');
    }
}

export {ResponseSender};