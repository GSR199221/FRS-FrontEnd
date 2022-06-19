// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {

//   searchFlightForm!: FormGroup

//   constructor(private formBuilder: FormBuilder) { }

//   ngOnInit() {
//     this.searchFlightInit();
//   }

//   searchFlightInit() {
//     this.searchFlightForm = this.formBuilder.group({
//       from: [''],
//       to: [''],
//     })
//   }

// }



import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
// UserBookingComponent
export class  HomeComponent implements OnInit {
  fromList = [
    'Hyderabad', 'Benguluru', 'Chennai', 'Vizag'
  ]
  toList = [
    'Benguluru',
    'Hyderabad',
    'Vizag',
    'Chennai'
  ]
  searchFlightForm!: FormGroup
  isActive: any
  flightList: any[] = []
  form!: FormGroup;
  selectedFlight: any = {}
  userform!: FormGroup;
  bookedFlghtsList: any[] = []
  @ViewChild('one') one!: ElementRef<HTMLElement>;
  @ViewChild('two') two!: ElementRef<HTMLElement>;
  @ViewChild('three') three!: ElementRef<HTMLElement>;
  flightBookHistory: any;
  isSelectedFlight = false;


  constructor(private fb: FormBuilder,private _api: ApiService, private _router: Router,
    private render:Renderer2) { }

  ngOnInit(): void {
    this.inItForm();
    this.userInit()
  }

  clickone() {
    let el: HTMLElement = this.one.nativeElement;
    el.click();
  }
  clicktwo() {
    let el: HTMLElement = this.two.nativeElement;
    el.click();
    setTimeout(() => {
      this._api.getBookings().subscribe((res:any) => {
        this.bookedFlghtsList = res
      })
    }, 1000);
  }
  clickthree() {
    let el: HTMLElement = this.three.nativeElement;
    el.click();
  }
  inItForm() {
    this.form = this.fb.group({
      from: [''],
      to: [''],
      date: [''],
      returnDate: [''],
      tripType:['']

    })
  }
  userInit() {
    this.userform = this.fb.group({
      adults: this.fb.array([])
    })
  }

  addEmployee() {
    this.employees().push(this.newEmployee());
  }
  employees(): FormArray {
    return this.userform.get("adults") as FormArray
  }
  newEmployee(): FormGroup {
    return this.fb.group({
      personName: [''],
      gender: [''],
      age: [''],
      menuType: ''
    })
  }

  search() {
    this._api.getFlights().subscribe((res:any) => {
      this.flightList = res.filter((ele:any) => {
        ele.bookedDate = this.form.value.date
        return ele.from == this.form.value.from && ele.to == this.form.value.to
      })
    })
  }

  onSelectFlight(i:any, row:any) {
    this.isActive = i
    this.selectedFlight = row
    this.isSelectedFlight = true
    this.addEmployee()

  }

  countinueBooking() {
    const paylod = {
      ...this.selectedFlight,
      ... this.userform.value,
      pending: true
    }
    this._api.postBookFlight(paylod).subscribe((res:any) => {
      alert('Seccuss booking')
    })
    // this.two.nativeElement.addClass='active'
    // this.render.addClass(this.two,"active");


    this.clicktwo() 
  }

  bookingHstory(row:any) {
    this.clickthree()
    this.flightBookHistory = row
  }

  cancelFlight(row:any) {
    this._api.deleteBookings(row.id).subscribe((res:any) => {
      this._api.getBookings().subscribe((res:any) => {
        this.bookedFlghtsList = res
      })
    })
  }
}