import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchFlightForm!: FormGroup

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.searchFlightInit();
  }

  searchFlightInit() {
    this.searchFlightForm = this.formBuilder.group({
      from: [''],
      to: [''],
    })
  }

}
