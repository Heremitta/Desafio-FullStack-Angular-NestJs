import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AlertMessageService } from '../shared/services/alert-message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  alertType = '';
  alertMessage = '';
  constructor(
    private _authService: AuthService,
    private alertMessageService: AlertMessageService
  ) {}

  async ngOnInit() {
    this.alertMessageService.alertMessage.subscribe((msg) => {
      (this.alertType = msg.type), (this.alertMessage = msg.message);
    });
    let token = await this._authService.checkUserIndexedDb();
    if (token) {
      this._authService.haveToken();
    }
  }
}
