import { Component, Output, EventEmitter } from '@angular/core';
import { delay } from 'rxjs';
import { Contact } from './Contact';
import { ContactService } from './services/contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  contact! : Contact;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.getContact().subscribe((contactGot) => (this.contact = contactGot));
  }

  /*
  * Uses the contact service to save the contact passed from the form component then opens the modal to display the information back to the user
  */
  SaveContact(contact: Contact) {
    this.contactService.saveContact(contact).subscribe((contactGot) => (this.contact = contactGot));
    this.OpenModal();
  }

  /*
  * Closes the popup modal by finding the element and settings it's display value to 'none' from 'flex'
  */
  CloseModal() {
    const modal = document.getElementById("popupModal");
    if (modal) {
      modal.style.display = "none";
      modal.classList.remove("opened");
    }
    this.ResetContactValues()
  }

  /*
  * Opens the popup modal by finding the element and settings it's display value to 'flex' from 'none'
  */
  OpenModal() {
    const modal = document.getElementById("popupModal");
    if (modal) {
      modal.style.display = "flex";
      document.getElementById("popupModal")?.children[0].classList.add("opened");
    }
  }

  /*
  * Clears the content of the current Contact so previous information doesn't stay around after it's been saved
  */
  ResetContactValues() {
    this.contact.name = '';
    this.contact.email = '';
    this.contact.phoneNumber = '';
    this.contact.companyName = '';
    this.contact.typeOfBusiness = '';
  }

}

