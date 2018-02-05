"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const db_manager_1 = require("./../managers/db.manager");
const router = express.Router();
const timeKey = 'login';
// middleware counts the time for incoming http request
router.use(function timeLog(req, res, next) {
    console.time(timeKey + req.url);
    next();
});
router.post('/loginUser', (req, res, next) => {
    const userObj = req.body;
    db_manager_1.default.login(userObj, (isAuthorised) => {
        if (!!isAuthorised) {
            res.send({ 'user': 'authorised' });
        }
        else {
            res.send({ 'user': 'notAuthorised' });
        }
        next();
    });
});
// middleware counts the time for incoming http request
router.use(function timeLog(req, res, next) {
    console.timeEnd(timeKey + req.url);
    next();
});
exports.default = router;
//# sourceMappingURL=login.route.js.map