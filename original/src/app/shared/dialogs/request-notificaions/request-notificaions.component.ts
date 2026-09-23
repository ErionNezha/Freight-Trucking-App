import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HeaderTitleService } from '../../services/header-title/header-title.service';

@Component({
  selector: 'app-send-notificaions',
  templateUrl: './request-notificaions.component.html',
  styleUrls: ['./request-notificaions.component.scss']
})
export class RequestNotificaionsComponent implements OnInit {
  @ViewChild('ngForm') myForm: any;

  firstformValues: any;
  firstFormGroup!: FormGroup;
  parentDialogRef: any;
  fromDialog: any;
  RequestNotificaionsComponent: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _headerTitle: HeaderTitleService
  ) {
    this.firstFormGroup = new FormGroup({
      addeventtriggerControl: new FormControl()
  });
  }
  

  addEventTrigger = [
    { name: 'On Inviting/Uninviting RFQs/RFBs'},
    { name: 'On receiving a Quotation/Bid'},
  ];


  ngOnInit(): void {
  }


  // closeDialog() {
  //   this.RequestNotificaionsComponent.close({ event: 'close', data: this.RequestNotificaionsComponent });
  // }

  onNoClick(): void {
    this.RequestNotificaionsComponent.close({ event: 'close', data: this.RequestNotificaionsComponent });
  }





  

}
