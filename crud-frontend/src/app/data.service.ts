import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: Http) { }

  getTaskItems(){
    return this.http.get('http://localhost:4000/api/taskItems')
    .map(res => res.json());
  }

  addTaskItem(newItem){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:4000/api/taskItem', newItem, {headers: headers})
    .map(res => res.json());
  }

  deleteTaskItem(id){
    return this.http.delete('http://localhost:4000/api/taskItem/'+ id)
    .map(res => res.json());
  }

  updateTaskItem(newItem){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:4000/api/taskItem/' + newItem._id, newItem, {headers: headers})
    .map(res => res.json());
  }
}
