import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { Contact } from '../Contact';
import { HttpClient, HttpHeaders } from '@angular/common/http'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:5000/contact'

  constructor(private http:HttpClient) { }

  getContact(): Observable<Contact> {
    return this.http.get<Contact>(this.apiUrl);
  }

  saveContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact, httpOptions);
  }
}
