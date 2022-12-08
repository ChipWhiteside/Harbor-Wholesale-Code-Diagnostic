import { Component, Input } from '@angular/core';
import { Contact } from '../../Contact';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  @Input() contactToDisplay: Contact | undefined;
}
