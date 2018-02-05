import {Component} from '@angular/core';
import {AuthenticationService} from "../../services/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'my-login',
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})

export class LoginComponent {
  public failedMessage: string;
  public user = {username: '', pw: ''};
  public notAuthorised: boolean;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  login(): void {
    this.authenticationService.login(this.user)
      .subscribe(
        data => {
          if (data.user === 'authorised') {
            this.router.navigate(['/folderMonitor']);
          }
          else {
            this.notAuthorised = true;
            this.failedMessage = "Incorrect login details";
          }
        },
        err => {this.notAuthorised = true;
          this.failedMessage = `Check your connection, or contact the admin - ${err}`; } );
  }

}
