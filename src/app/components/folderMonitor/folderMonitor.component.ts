import {Component} from '@angular/core';
import {HttpService} from '../../services/http.service';


@Component({
  selector: 'folder-monitor',
  templateUrl: './app/core/components.folderMonitor.html',
  styleUrls: ['']
})
export class FolderMonitorComponent {

  public selectedFolder = {folderPath: 'C:\\Users\\gzausmer\\Downloads\\New folder'};

  constructor(private http: HttpService) { }

  onFolderChanged(selectedFolder) {
    this.selectedFolder = selectedFolder;
  }

  play() {
    this.http.start(this.selectedFolder);
  }

  stop() {
    this.http.stop();
  }

  getEventArr() {
    return this.http.getEventArr();
  }

}
