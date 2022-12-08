import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../../Contact';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Output() onSave: EventEmitter<Contact> = new EventEmitter<Contact>();

  @Input()
  contact!: Contact;

  name: string = "";
  email: string = "";
  phoneNumber: string = "";
  companyName: string = "";
  typeOfBusiness: string = "";
  
  ngOnInit(): void {  }

  // TODO: Currently function changes actual phone number string saved and loaded, change to only update the display.
  FormatPhoneNumber() {
    let formattedPhoneNumber = ""; 
    const len = this.phoneNumber.length;
    for (let i = 0; i < len; i++) {
      if (i == 3 && len < 5) {
        if (formattedPhoneNumber[0] == "(") 
          formattedPhoneNumber = formattedPhoneNumber.substring(1);
        else
          formattedPhoneNumber = "(".concat(formattedPhoneNumber, ") ");
      }
      if (i == 9 && len < 11) {
        formattedPhoneNumber = formattedPhoneNumber.concat(" ");
        console.log("Phone: " + formattedPhoneNumber);

      }
      formattedPhoneNumber = formattedPhoneNumber.concat(this.phoneNumber[i]);
    }
    this.phoneNumber = formattedPhoneNumber;
  }

  /*
  * On submit button pressed, verify all fields are filled out manually and if not apply the required animation to the input box. 
  * If all required information is provided, emit the onSave event which tells the app.component to save the contact provided
  * TODO: Use extraction to simplify this repetition
  */
  onSubmit() {
    let goodToSubmit = true;
    document.getElementById("name")?.classList.remove("req");
    document.getElementById("email")?.classList.remove("req");
    document.getElementById("phoneNumber")?.classList.remove("req");
    document.getElementById("companyName")?.classList.remove("req");
    document.getElementById("typeOfBusiness")?.classList.remove("req");

    if (!this.name) {
      goodToSubmit = false;
      document.getElementById("name")?.classList.add("req");
    }

    if (!this.email) {
      goodToSubmit = false;
      document.getElementById("email")?.classList.add("req");
    }

    if (!this.phoneNumber) {
      goodToSubmit = false;
      document.getElementById("phoneNumber")?.classList.add("req");
    }

    if (!this.companyName) {
      goodToSubmit = false;
      document.getElementById("companyName")?.classList.add("req");
    }

    if (!this.typeOfBusiness) {
      goodToSubmit = false;
      document.getElementById("typeOfBusiness")?.classList.add("req");
    }

    if (goodToSubmit) {
      // Create new contact to be saved
      const newContactToSave: Contact = {
        name: this.name,
        email: this.email,
        phoneNumber: this.phoneNumber,
        companyName: this.companyName,
        typeOfBusiness: this.typeOfBusiness,
        dateTimeReachedOut: Date.now().toString() // TODO: convert to UTC before saving
      }

      // Emit save event with newly created contact
      this.onSave.emit(newContactToSave);

      // Reset input field values for cleaner look in the background & to 'refresh' the page 
      this.name = '';
      this.email = '';
      this.phoneNumber = '';
      this.companyName = '';
      this.typeOfBusiness = '';
    }
  }
}
