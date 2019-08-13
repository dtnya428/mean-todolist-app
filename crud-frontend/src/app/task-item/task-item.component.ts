import { Component, OnInit } from '@angular/core';
import {TaskItem} from '../item';
import {DataService} from '../data.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
  providers: [DataService]
})
export class TaskItemComponent implements OnInit {
  taskItemList: TaskItem[]= [];
  selectedTaskItem: TaskItem;
  toggleForm: boolean= false;

  constructor(private dataService: DataService) { }

  getItems(){
    this.dataService.getTaskItems()
    .subscribe( items => {
      this.taskItemList = items;
      console.log('data from data service: ' + this.taskItemList);
    });
  }

  addItem(form){
    let newItem: TaskItem = {
      taskName: form.value.taskName
    }
    this.dataService.addTaskItem(newItem)
    .subscribe(item =>{
      console.log(item);
      this.getItems();
    });
  }

  deleteItem(id){
    this.dataService.deleteTaskItem(id)
    .subscribe(data =>{
      if(data.n==1){
        for(var i= 0; i < this.taskItemList.length; i++){
            if(id == this.taskItemList[i]._id){
              this.taskItemList.splice(i,1);
            }
        }
      }
    });
  }

  updateItem(form){
    let newItem: TaskItem = {
      _id: this.selectedTaskItem._id,
      taskName: form.value.taskName
    }
    this.dataService.updateTaskItem(newItem)
    .subscribe(result =>{
      console.log('Original Item' + result);
      this.getItems();
    });
    this.toggleForm = !this.toggleForm;
  }

  showEditForm(item){
      this.selectedTaskItem = item;    
      this.toggleForm = !this.toggleForm;
  }

  ngOnInit() {
    this.getItems();
  }
}
