import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationUserComponent } from './information-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfirmationService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router'

describe('InformationUserComponent', () => {
  let component: InformationUserComponent;
  let fixture: ComponentFixture<InformationUserComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InformationUserComponent],
      imports: [FormsModule, ReactiveFormsModule, ConfirmDialogModule, HttpClientTestingModule, RouterTestingModule],
      providers: [ConfirmationService, { provide: ActivatedRoute, useValue: fakeActivatedRoute }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   fixture.componentInstance.userInfo = {
  //     firstName: 'Jonas',
  //     lastName: 'Siqueira',
  //     age: 18,
  //     description: 'Test'
  //   };

  //   expect(component).toBeFalsy();
  // });

  // it('get user', () => {

  // }); 
});
