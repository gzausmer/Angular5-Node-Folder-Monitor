const watch = require('watch');

class MonitorService {
  monitoringMap: Map<any, any> = new Map();
  statusArr: any[] = [];
  localFolderPath = '';

  startMonitoring(folderPath) {
    console.log('Started listening..');
    this.localFolderPath = folderPath;
    this.setMonitoringData(this.localFolderPath, {});

    watch.createMonitor(this.localFolderPath, {interval: 1}, (monitor) => {
      monitor.on('created', (f, stat) => {
        const status = stat.isDirectory() ? 'new folder created' : 'new file created';
        let isAlreadyExists = false;

        this.statusArr.forEach(item => {
          if (item.fileName === f) {
            isAlreadyExists = true;
          }
        });

        if (!isAlreadyExists) {
          this.statusArr.unshift({status, fileName: f});

          this.setMonitoringData(folderPath, this.statusArr);
          console.log('create started', status);
        }
      });

      monitor.on('changed', (f, curr, prev) => {

        const status = curr.isDirectory() ? 'folder updated' : 'file updated';

        this.statusArr.unshift({status, fileName: f});
        this.setMonitoringData(folderPath, this.statusArr);
        console.log(status);
      });

      monitor.on('removed', (f, stat) => {

        const status = stat.isDirectory() ? 'folder removed' : 'file removed';

        this.statusArr.unshift({status, fileName: f});
        this.setMonitoringData(folderPath, this.statusArr);
        console.log(status);

      });

    });
  }

  getStatus() {
    return this.getMonitoringData(this.localFolderPath);
  }

  stopMonitoring() {
    watch.unwatchTree(this.localFolderPath);
    console.log('stopped..');
  }

  getMonitoringData(folderPath) {
    const response = this.monitoringMap.get(this.localFolderPath);
    this.statusArr = [];
    this.setMonitoringData(folderPath, {}); // clean the map for new request
    return response;
  }

  setMonitoringData(monitoringPath, value) {
    this.monitoringMap.set(monitoringPath, value);
  }
}

export default new MonitorService();
