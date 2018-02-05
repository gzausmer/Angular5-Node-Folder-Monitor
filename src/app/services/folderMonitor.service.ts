import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable';
import {Subscription} from 'rxjs/Subscription';
import {apiUrl, httpOptions} from '../consts';

@Injectable()

export class HttpService {
  public folderDoesNotExist: boolean;
  obs: Subscription;
  eventArr = [];
  private monitoringPath = apiUrl + 'monitor/';

  constructor(private http: HttpClient) { }

  start(selectedFolder) {
    return this.http.post( this.monitoringPath + 'start', selectedFolder, httpOptions);
  }

  stop(obs$) {
    if (!obs$) { return; }
    obs$.unsubscribe();
    this.eventArr = [];
    this.http.post( this.monitoringPath + 'stop', null, httpOptions).subscribe();
  }

  getEventArr() {
    return this.eventArr;
  }

  pollService() {
    return IntervalObservable
      .create(1000)
      .mergeMap((i) => this.http.get(this.monitoringPath + 'status'))
      .subscribe((res: Array<any>) => {
        if (res && res.length) {
          res.forEach(item => this.addIcon(item));
          this.eventArr.unshift(...res);
        }
      });
  }

  addIcon(event) {
    switch (event.status) {
      case("New folder created"):
        event['icon'] = "create_new_folder";
        event['color'] = "green";
        return;

      case("New file created"):
        event['icon'] = "insert_drive_file";
        event['color'] = "green";
        return;

      case("File removed"):
        event['icon'] = "delete_forever";
        event['color'] = "red";
        return;

      case("Folder removed"):
        event['icon'] = "delete_forever";
        event['color'] = "red";
        return;

      case("File updated"):
        event['icon'] = "message";
        event['color'] = "blue";
    }
  }

}
