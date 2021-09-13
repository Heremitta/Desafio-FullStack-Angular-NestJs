import { Component, Input, OnInit } from '@angular/core';
import { AlertMessageService } from '../../services/alert-message.service';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss'],
})
export class AlertMessageComponent {
  @Input() type: string = '';
  @Input() message: string = '';

  constructor(private alertService: AlertMessageService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.alertService.alertMessage.subscribe((e) => {
      this.message = e.message;
      this.type = e.type;
    });
  }
}
