import express from "express";
import {router} from "./route/route.js";

const app = express();
app.use(router);
app.listen(3000, function () {
    console.log('listening on 3000')
})
