import fs from "fs";
import {logger} from "../config/winston-logger";
import {ImageSendingError} from "../util/error";

class ResponseSender {
    static sendOkJson(res, data) {
        res.writeHead(200, {
            'Content-Type': 'application/json;charset=utf-8'
        });
        res.end(JSON.stringify(data, null, "  "));
    }

    static trySendPng(res, imagePath) {
        try {
            let image = fs.readFileSync(imagePath);
            res.writeHead(200, {'Content-Type': 'image/png'});
            res.end(image, 'binary');
        } catch (error) {
            logger.error('', new ImageSendingError(imagePath, error));
        }
    }

    // TODO unfinished
    makeJsonResponse(code, msg, ObjArray, res) {
        var response = {
            "code": code,
            "message": msg,
            "result": ObjArray
        };
        resHead200Json(res, response);
        return response;
    }
}