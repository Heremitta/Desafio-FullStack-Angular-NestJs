import { Observable } from "rxjs";
import { AuthService } from "src/app/shared/services/auth.service";
import { Component, OnInit, TemplateRef } from "@angular/core";
import { authLoginDto, LoginDto } from "../shared/dtos/login.dto";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  currentUser: authLoginDto | undefined;
  modalRef?: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private _authService: AuthService,
  ) {}

  async ngOnInit() {
    let token = await this._authService.checkUserIndexedDb();
    if (token) {
      this._authService.haveToken();
    } else {
      if (this._authService.isLoged.value == false) {
        this._authService.logout();
      }
      this._authService.isLoged.next(false);
    }

    this._authService.user$?.subscribe((e) => {
      this.currentUser = e;
    });
  }

  logout() {
    this._authService.logout();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }
  confirm(): void {
    this.logout();
    this.modalRef?.hide();
  }

  decline(): void {
    this.modalRef?.hide();
  }
}
