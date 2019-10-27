import {Component, OnInit} from '@angular/core';
import {StudentService} from '../../../services/student.service';
import {Student} from '../../../models/Student';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ClassComponent} from '../class/class.component';
import {UserEditComponent} from './modal/user-edit.component';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/User';

@Component({
  templateUrl: 'user.component.html'
})
export class UserComponent implements OnInit {

  public manageUser;
  public users: User[] = [];
  public currentUser: Student = new Student();

  constructor(public userService: UserService,
              public modalService: NgbModal) {

  }

  ngOnInit(): void {
    this.search(null);
  }

  public search($event) {
    this.userService.getAll().subscribe(response => {
      this.users = response;
      console.log(this.users);
    });
  }

  public openEditWindow(window, user) {
    const modalRef = this.modalService.open(UserEditComponent, {size: 'lg'});

    const instance = modalRef.componentInstance;

    if (user == null) {
      instance.currentUser = new User();
    } else {
      instance.currentUser = user;
    }

    modalRef.result.then((res) => {
      this.search(null);
    });
  }

  public closeEditWindow() {
    this.currentUser = new Student();
    this.manageUser.hide();
  }

  public save() {
    // 新增
    if (!this.currentUser.id) {
      this.userService.add(this.currentUser).subscribe(response => {
        this.students.unshift(response);
        this.closeEditWindow();
      });
      return;
    }

    // 修改
    this.studentService.update(this.currentUser).subscribe(response => {
      this.closeEditWindow();
    });
  }

  public delete(user) {
    this.studentService.delete(user.id).subscribe(response => {
      const index = this.students.findIndex(u => u.id === user.id);
      this.students.splice(index, 1);
    });
  }
}
