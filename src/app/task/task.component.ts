import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { TaskService } from './Shared/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [TaskService],
})
export class TaskComponent implements OnInit {
  taskListArray: any[];
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getTaskList().snapshotChanges()
      .subscribe(item => {
        this.taskListArray = [];
        item.forEach(element => {
          var x = element.payload.toJSON();
          x["key"] = element.key;
          this.taskListArray.push(x);
        })

        this.taskListArray.sort((a, b) => {
          return a.isChecked - b.isChecked;
        })
      });
  }


  onAddClick(task) {
    this.taskService.addTask(task.value);
    task.value = null;
  }

  onCheckClick(task: string, isChecked) {
    this.taskService.checkOrUncheckTask(task, !isChecked);
  }

  onDeleteClicked(task: string) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.taskService.removeTask(task);
    }
  }
}

