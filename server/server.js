"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const db_manager_1 = require("./managers/db.manager");
// @@ routers
const login_route_1 = require("./routers/login.route");
const monitor_route_1 = require("./routers/monitor.route");
class App {
    constructor() {
        this.PORT = 3000;
        this.init();
    }
    init() {
        this.app = express();
        this.registerParser();
        this.setHeaders();
        this.setRouters();
        this.startServer();
        this.initDatabase();
    }
    registerParser() {
        this.app.use(bodyParser.json({ limit: '25mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '25mb', extended: true }));
    }
    initDatabase() {
        // create db
        db_manager_1.default.createDB();
    }
    setHeaders() {
        this.app.use((req, res, next) => {
            const allowedOrigins = ['http://localhost:4200/'];
            const origin = req.headers.origin;
            if (origin && allowedOrigins.indexOf(origin.toString()) > -1) {
                res.setHeader('Access-Control-Allow-Origin', origin);
            }
            res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
    }
    setRouters() {
        // @@ Register the routers to the express instance
        this.app.use('/login', login_route_1.default);
        this.app.use('/monitor', monitor_route_1.default);
    }
    startServer() {
        // Start the server
        this.app.listen(this.PORT, () => console.log('Server listening on port ' + this.PORT + '!'));
    }
}
/**
 * App initialization
 */
new App();
//# sourceMappingURL=server.js.map