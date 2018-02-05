import monitorService from "../monitor.manager";
import * as express from "express";
import * as fs from "fs";
const router = express.Router();
const timeKey = 'monitorRoute';

// middleware counts the time for incoming http request
router.use( function timeLog (req, res, next) {
  console.time(timeKey + req.url);
  next();
});

router.post('/start', function (req, res , next) {
  const folderPath = req.body.folderPath;
  if (!fs.existsSync(folderPath)) {
    console.log("folder does not exist!");
    res.send({"statusText": "Cannot find selected folder path!"});
  }
  else {
    monitorService.startMonitoring(folderPath);
    res.send({"statusText": 'success'});
    next();
  }
});

router.get('/status', (req, res, next) => {
  res.send(monitorService.getStatus());
  next();
});

router.post('/stop', function (req, res, next) {
  monitorService.stopMonitoring();
  res.status(200).json('success');
  next();
});

// display the time in the console
router.use( function timeLog (req, res, next) {
  console.timeEnd(timeKey + req.url);
  next();
});

export default router;

