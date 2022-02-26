import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../list-todos/list-todos.component';
import { TodoDataService } from '../service/data/todo-data.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  id: number = Number(this.route.snapshot.params['id'])
  todo: Todo = new Todo(1, '', false, new Date());

  constructor(
    private todoService: TodoDataService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);
    this.todo = new Todo(this.id, '', false, new Date());

    if(this.id !== -1){
      this.todoService.retrieveTodo('me', this.id).subscribe(
        data => this.todo = data
      )
    }
  }

  saveTodo(){
    if (this.id === -1 ){
      //Create todo
      //console.log("creating todo")
      this.todoService.createTodo('me', this.todo)
        .subscribe(
          data => {
            console.log(data) 
            this.router.navigate(['todos']);
          }
      )
      //console.log("id = " + this.id);
    }

    else{
      this.todoService.updateTodo('me', this.id, this.todo)
        .subscribe(
          data => {
            console.log(data) 
            this.router.navigate(['todos']);
          }
      )
    }
  }

}
