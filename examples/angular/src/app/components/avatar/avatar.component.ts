import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  standalone: true,
})
export class AvatarComponent {
  protected user = inject(UserService);
  protected actor = this.user.actor.asReadonly();
  protected avatar = toSignal(this.user.avatar$, { initialValue: '' });

  login() {
    this.user.login();
  }

  logout() {
    this.user.logout();
  }
}
