import fs from "fs";
import {logger} from "../config/winston-logger.js";
import {ImageSendingError} from "../util/error.js";

export class ResponseSender {

    static sendJson(res, data = '') {
        res.json(data);
    }

    static sendPngOr404(res, imagePath) {
        try {
            let image = fs.readFileSync(imagePath);
            res.status(200).set({'Content-Type': 'image/png'});
            res.end(image, 'binary');
        } catch (error) {
            logger.error(new ImageSendingError(imagePath, error).toString());
            this.send404NotFound(res);
        }
    }

    /*
    Mian's screenshot resource won't be updated since I can't contact with her,
        but providing a API to assess old resource still make sense.
    When trying to search and send images in mian's resource,
        ignore error log since it happens frequently.
     */
    static sendPngOr404DontLogError(res, imagePath) {
        try {
            let image = fs.readFileSync(imagePath);
            res.status(200).set({'Content-Type': 'image/png'});
            res.end(image, 'binary');
        } catch (error) {
            this.send404NotFound(res);
        }
    }

    static send204NoContent(res, data = '') {
        res.status(204).send(data);
    }

    static send400WhenRequestParamValuesHaveIllegal(res, ...illegalParamPairs) {
        let explanation = `Unsupported parameter value at: ${illegalParamPairs}`;
        this.send400BadRequest(res, explanation);
    }

    static send400BadRequest(res, explanation) {
        res.status(400).send(explanation);
    }

    static send404NotFound(res) {
        res.status(404).send(
            'Sorry, we cannot find appropriate response!\n' +
            '\t\t\\\n' +
            '_____cat____prostrating-girl______');
    }

    static send409Conflict(res, explanation) {
        res.status(409).send(explanation);
    }

    static send500InternalServerError(res) {
        res.status(500).send(
            'Internal server error happened, ' +
            'tell the server administrator to check log or ' +
            'report it as an issue on project issue page: ' +
            '[https://github.com/boholder/KanColleREST/issues]');
    }
}