import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users: any = [];
  usersCopy: any = [];
  usersSelected: any = [];

  constructor(private userServ: UserService, private router: Router) {
    this.listUser();
  }

  ngOnInit() {
  }

  async listUser() {
    try {
      this.users = JSON.parse(localStorage.getItem('users'));
      if (this.users) {
        this.usersCopy = this.users;
      } else {
        this.users = await this.userServ.listUsers().toPromise();
        this.usersCopy = this.users;
        localStorage.setItem('users', JSON.stringify(this.users));
      }
    } catch (error) {
      console.log(error);
    }
  }

  filterUsers(dto) {
    let res = this.usersCopy.filter(user => !!user.firstName.toLowerCase().match(dto.toLowerCase()));

    if (dto.length == 0) {
      this.users = this.usersCopy;
    } else if (res.length > 0) {
      this.users = res;
    }
  }

  getUsersSelected(user, event) {
    if (event.target.checked) {
      this.usersSelected.push(user);
    } else {
      for (var i = 0; i < this.usersSelected.length; i++) {
        if (this.usersSelected[i].id == user.id) {
          this.usersSelected.splice(i, 1);
        }
      }
    }
  }

  async deleteUser(dto) {
    try {
      this.users = await this.userServ.deleteUser(dto);
      localStorage.setItem('users', JSON.stringify(this.users));
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUsers() {
    try {
      this.users = await this.userServ.deleteUsers(this.usersSelected);
      this.usersSelected = [];
    } catch (error) {
      console.log(error);
    }
  }

  async downloadUsers() {
    try {
      var dto = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.usersSelected));
      var downloadUsers = document.getElementById('downloadUsers');
      downloadUsers.setAttribute("href", dto);
      downloadUsers.setAttribute("download", "users.json");
      downloadUsers.click();
    } catch (error) {
      console.log(error);
    }
  }

  showUser(dto) {
    try {
      this.router.navigate(['user/info', dto.id]);
      // console.log(dto);
    } catch (error) {
      console.log(error);
    }
  }
}
