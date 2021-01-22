"use strict";

import express from "express";

const router = express.Router();

// 主页路由
router.get('/', (req, res) => {
    Controller.root(req, res);
});

class Controller {
    static root(req, res) {

        // construct the response
        let response = {
            "project_url":
                "https://github.com/boholder/KanColleREST"
        };

        res.writeHead(200, {
            'Content-Type': 'application/json;charset=utf-8'
        });
        res.end(JSON.stringify(response, null, "  "));
    }

}

export {router};