import {Component, Input, OnInit} from '@angular/core';
import {Student} from '../../../../models/Student';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {StudentService} from '../../../../services/student.service';
import {AlertComponent} from 'ngx-bootstrap';

@Component({
  selector: 'app-user-edit',
  templateUrl: './student-edit.component.html'
})
export class StudentEditComponent implements OnInit {

  @Input()
  public currentUser: Student;

  constructor(private actionModal: NgbActiveModal,
              private userService: StudentService) { }

  ngOnInit() {
  }

  save() {
    if (this.currentUser.id == null) {
      this.userService.add(this.currentUser).subscribe(response => {
        this.actionModal.close(this.currentUser);
      });
    } else {
      this.userService.update(this.currentUser).subscribe(response => {
        this.actionModal.close(this.currentUser);
      });
    }

  }
}
