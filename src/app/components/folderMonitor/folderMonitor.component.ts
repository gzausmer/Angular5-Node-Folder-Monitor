import {Component, OnDestroy} from '@angular/core';
import {FolderMonitorService} from '../../services/folderMonitor.service';
import {AuthenticationService} from "../../services/auth.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'folder-monitor',
  templateUrl: "./folderMonitor.component.html",
  styleUrls: ["./folderMonitor.component.scss"]
})

export class FolderMonitorComponent implements OnDestroy {
  eventArr: any[] = [];
  obs$: Subscription;
  public selectedFolder = '';
  public isPlayPressed: boolean;
  public failedMessage: string;

  constructor(private folderMonitorService: FolderMonitorService, private auth: AuthenticationService) { }

  play(): void {
    this.isPlayPressed = true;
    this.failedMessage = '';
    this.folderMonitorService.start({folderPath: this.selectedFolder})
      .subscribe((res: Response) => {
        if (res && res.statusText === 'success') {
          this.obs$ = this.folderMonitorService.pollService();
          this.eventArr = this.folderMonitorService.getEventArr();
        }
        else {
          this.failedMessage = res.statusText;
        }
      }, (err) => {
        this.failedMessage = `Check your connection, or contact the admin - ${err}`;
       } );
  }

  stop(): void {
    this.isPlayPressed = false;
    this.eventArr = [];
    if (this.obs$) {
      this.folderMonitorService.stop(this.obs$);
    }
  }

  logout(): void {
    this.stop();
    this.auth.logout();
  }

  ngOnDestroy(): void {
    this.stop();
  }

}
