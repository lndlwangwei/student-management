import {Component, OnInit} from '@angular/core';
import {StudentService} from '../../../services/student.service';
import {Student} from '../../../models/Student';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ClassComponent} from '../class/class.component';
import {StudentEditComponent} from './modal/student-edit.component';

@Component({
  templateUrl: 'student.component.html'
})
export class StudentComponent implements OnInit {

  public manageUser;
  public students: Student[] = [];
  public params: any = {totalSize: 10, pageSize: 15, currentPage: 1};
  public maxSize = 5;
  public currentUser: Student = new Student();

  constructor(public studentService: StudentService,
              public modalService: NgbModal) {

  }

  ngOnInit(): void {
    this.search(null);
  }

  public search($event) {
    if ($event) {
      this.params.currentPage = $event.page;
    }

    this.studentService.get(this.params).subscribe(response => {
      this.params.currentPage = response.currentPage;
      this.params.totalSize = response.totalSize;
      this.params.pageSize = response.pageSize;
      this.students = response.items;
      console.log(this.students);

      if (this.students) {
        this.students.forEach(user => user.scores = user.score.split('\n'));
      }
    });
  }

  public openEditWindow(window, user) {
    const modalRef = this.modalService.open(StudentEditComponent, {size: 'lg'});

    const instance = modalRef.componentInstance;

    if (user == null) {
      instance.currentUser = new Student();
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
      this.studentService.add(this.currentUser).subscribe(response => {
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
