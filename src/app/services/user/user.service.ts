import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  apiURL: string = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) { }

  addUsers() {
    // return this.http.get(`${this.apiURL}`);
  }

  listUsers(): Observable<any> {
    return this.http.get('../../../assets/database/users.json');
  }

  deleteUser(dto) {
    // return this.http.get(`${this.apiURL}`);
    let response: any = JSON.parse(localStorage.getItem('users'));
    response.map((res, index) => {
      if (res.id == dto.id) {
        response.splice(index, 1);
      }
    })
    localStorage.setItem('users', JSON.stringify(response));
    return response;
  }

  deleteUsers(dto) {
    // return this.http.get(`${this.apiURL}`);
    let response: any = JSON.parse(localStorage.getItem('users'));
    for (var i = 0; i < response.length; i++) {
      for (let index = 0; index < dto.length; index++) {
        if (response[i].id === dto[index].id) {
          response.splice(i, 1);
        }
      }
    }
    localStorage.setItem('users', JSON.stringify(response));
    return response;
  }

  updateUsers(dto) {
    let response: any = JSON.parse(localStorage.getItem('users'));
    response.map((user, index) => {
      if(user.id == dto.id){
        response[index] = dto;
      }
    })
    console.log(response);
    localStorage.setItem('users', JSON.stringify(response));
    return response;
  }
}
