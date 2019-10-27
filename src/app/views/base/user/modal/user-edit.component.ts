import {Component, Input, OnInit} from '@angular/core';
import {Student} from '../../../../models/Student';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {StudentService} from '../../../../services/student.service';
import {AlertComponent} from 'ngx-bootstrap';
import {User} from '../../../../models/User';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {

  @Input()
  public currentUser: User;

  constructor(private actionModal: NgbActiveModal,
              private userService: UserService) {
  }

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
