import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

interface messageAlert {
  type: string;
  message: string;
}
@Injectable({
  providedIn: "root",
})
export class AlertMessageService {
  alertMessage = new BehaviorSubject<messageAlert>({ type: "", message: "" });
  constructor() {}

  setAlert(type: string, message: string) {
    this.alertMessage.next({ type, message });
    setTimeout(() => {
      this.alertMessage.next({ type: "", message: "" });
    }, 2500);
  }
}
