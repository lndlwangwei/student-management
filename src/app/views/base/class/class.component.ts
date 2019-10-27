import { Component, OnInit } from '@angular/core';
import {Student} from '../../../models/Student';
import {StudentService} from '../../../services/student.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html'
})
export class ClassComponent implements OnInit {

  public manageUser;
  public users: Student[] = [];
  public params: any = {totalSize: 10, pageSize: 15, currentPage: 1};
  public maxSize = 5;
  public currentUser: Student = new Student();

  constructor(public userService: StudentService) {

  }

  ngOnInit(): void {
    this.search(null);
  }

  public search($event) {
    if ($event) {
      this.params.currentPage = $event.page;
    }

    this.userService.get(this.params).subscribe(response => {
      this.params.currentPage = response.currentPage;
      this.params.totalSize = response.totalSize;
      this.params.pageSize = response.pageSize;
      this.users = response.items;
      console.log(this.users);
    });
  }

  public openEditWindow(window, user) {
    this.manageUser = window;
    if (user) {
      this.currentUser = user;
    }

    window.show();
  }

  public closeEditWindow() {
    this.currentUser = new Student();
    this.manageUser.hide();
  }

  public save() {
    // 新增
    if (!this.currentUser.id) {
      this.userService.add(this.currentUser).subscribe(response => {
        this.users.unshift(response);
        this.closeEditWindow();
      });
      return;
    }

    // 修改
    this.userService.update(this.currentUser).subscribe(response => {
      this.closeEditWindow();
    });
  }

  public delete(user) {
    this.userService.delete(user.id).subscribe(response => {
      const index = this.users.findIndex(u => u.id === user.id);
      this.users.splice(index, 1);
    });
  }

}
