import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable';
import {apiUrl, httpOptions} from '../consts';
import {Observable} from "rxjs/Observable";
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

@Injectable()

export class FolderMonitorService {

  eventArr: any[] = [];
  private monitoringPath = apiUrl + 'monitor/';

  constructor(private http: HttpClient) { }

  start(selectedFolder): Observable<any> {
    return this.http.post( this.monitoringPath + 'start', selectedFolder, httpOptions)
      .pipe(
        tap(() => { console.log(`start monitoring`); }),
        catchError(this.handleError('startMonitoring', []))
      );
  }

  stop(obs$): void {
    if (!obs$) { return; }
    obs$.unsubscribe();
    this.eventArr = [];
    this.http.post( this.monitoringPath + 'stop', null, httpOptions).subscribe();
  }

  getEventArr(): any[] {
    return this.eventArr;
  }

  pollService() {
    return IntervalObservable
      .create(1000)
      .mergeMap((i) => this.http.get(this.monitoringPath + 'status'))
      .subscribe((res: Array<any>) => {
        if (res && res.length) {
          res.forEach(item => this.addAttributes(item));
          this.eventArr.unshift(...res);
        }
      });
  }

  addAttributes(event): void {

    const createFolder = {icon: "create_new_folder", color: "green"};
    const createFile = {icon: "insert_drive_file", color: "green"};
    const deleteFile = {icon: "delete_forever", color: "red"};
    const updateFile = {icon: "message", color: "blue"};

    switch (event.status) {

      case("New folder created"):
        event['icon'] = createFolder.icon;
        event['color'] = createFolder.color;
        return;

      case("New file created"):
        event['icon'] = createFile.icon;
        event['color'] = createFile.color;
        return;

      case("File removed"):
        event['icon'] = deleteFile.icon;
        event['color'] = deleteFile.color;
        return;

      case("File updated"):
        event['icon'] = updateFile.icon;
        event['color'] = updateFile.color;
        return;
    }
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      return Observable.throw(`${error.message}`);
      // Let the app keep running by returning an empty result.

    };
  }

}
