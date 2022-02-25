import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoDataService } from '../service/data/todo-data.service';

export class Todo{
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ){

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  todos:Todo[];
  message: string;
  /*[
    new Todo(1, 'Learn to Dance', false, new Date()),
    new Todo(2, 'Learn Angular', false, new Date()),
    new Todo(3, 'Get a Job', false, new Date())
    /*
    {id: 1, description: 'Learn to Dance'},
    {id: 2, description: 'Learn Angular'},
    {id: 3, description: 'Get a Job'} */
  //] 

  /*
  todo = {
    id: 1,
    description: 'Learn to Dance'
  } */

  constructor(
    private todoService:TodoDataService,
    private router:Router
  ) { this.todos = []
      this.message = ''
    }

  ngOnInit(): void {
    this.refreshTodos();
  }

  refreshTodos(){
    this.todoService.retrieveAllTodos('me').subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    );
  }

  deleteTodo(id:number) {
    console.log(`delete todo ${id}`)
    this.todoService.deleteTodo('me', id).subscribe(
      response => {
        console.log(response);
        this.message = `Deleted todo ${id}`
        this.refreshTodos();
      }
    )
  }


  updateTodo(id:number){
    console.log(`updated todo ${id}`)
    this.router.navigate(['todos', id])
  }
}
