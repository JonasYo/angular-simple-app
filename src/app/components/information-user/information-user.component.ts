import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-information-user',
  templateUrl: './information-user.component.html',
  styleUrls: ['./information-user.component.css']
})
export class InformationUserComponent implements OnInit {
  userId: Number;
  userInfo: any;
  formChanges: boolean = false;

  formUser: FormGroup;

  constructor(private userServ: UserService, private confirmationService: ConfirmationService, private route: ActivatedRoute, private router: Router, private builder: FormBuilder) {
    this.formUser = this.builder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    })
    this.getInfoUser();
  }

  ngOnInit() {

  }

  getInfoUser() {
    try {
      this.userId = parseInt(this.route.snapshot.paramMap.get('id'));
      let response: any = JSON.parse(localStorage.getItem('users'));
      response.map(user => {
        if (user.id === this.userId) {
          this.userInfo = user;
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  verifyChanges() {
    this.formChanges = true;
  }

  confirmCancel() {
    if (this.formChanges) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to cancel?',
        accept: () => {
          this.router.navigate(['user/list']);
        },
        reject: () => {
        }
      });
    } else {
      this.router.navigate(['user/list']);
    }
  }

  updateUser() {
    try {
      let res = this.userServ.updateUsers(this.userInfo);
      if (res) {
        this.router.navigate(['user/list']);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
