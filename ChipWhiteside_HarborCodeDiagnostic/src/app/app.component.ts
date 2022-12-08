import { Component, Output, EventEmitter } from '@angular/core';
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
    console.log("Contact: " + this.contact);
  }

  SaveContact(contact: Contact) {
    this.OpenModal();
    this.contactService.saveContact(contact).subscribe((contactGot) => (this.contact = contactGot));

    console.log("Contact: " + contact!);
  }

  CloseModal() {
    const modal = document.getElementById("popupModal");
    console.log("modal close: " + modal);
    if (modal) {
      modal.style.display = "none";
      modal.classList.remove("opened");
    }

    this.ResetContactValues()
  }

  OpenModal() {
    const modal = document.getElementById("popupModal");
    if (modal) {
      modal.style.display = "flex";
      document.getElementById("popupModal")?.children[0].classList.add("opened");
    }
  }

  ResetContactValues() {
    this.contact.name = '';
    this.contact.email = '';
    this.contact.phoneNumber = '';
    this.contact.companyName = '';
    this.contact.typeOfBusiness = '';
  }

}
