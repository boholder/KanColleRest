import fs from "fs";
import {logger} from "../config/winston-logger.js";
import {ImageSendingError} from "../util/error.js";

class ResponseSender {
    static sendStateJson(res, code, msg, dataArray) {
        let body = {
            "code": code,
            "message": msg,
            "result": dataArray
        };
        this.sendJson(res, body);
    }

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
            this.send404(res);
        }
    }

    static send404(res) {
        res.status(404).send(
            '"Sorry, we cannot find appropriate response!"x\n' +
            '\t\t\\\n' +
            '_____cat____kowtowing-girl______');
    }
}

export {ResponseSender};