import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { TransferComponent } from './components/transfer/transfer.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, TransferComponent],
  templateUrl: './app.component.html',
  standalone: true,
})
export class AppComponent {
  readonly title = 'Proton Angular App';
}
