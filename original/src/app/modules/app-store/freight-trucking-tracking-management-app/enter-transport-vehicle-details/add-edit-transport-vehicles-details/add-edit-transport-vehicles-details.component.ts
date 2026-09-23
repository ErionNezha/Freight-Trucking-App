import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';

@Component({
  selector: 'app-add-edit-transport-vehicles-details',
  templateUrl: './add-edit-transport-vehicles-details.component.html',
  styleUrls: ['./add-edit-transport-vehicles-details.component.scss']
})
export class AddEditTransportVehiclesDetailsComponent implements OnInit {
  formValues: any;
  firstFormGroup!: FormGroup;
  
  constructor(
    private _formBuilder: FormBuilder,
    private _headerTitle: HeaderTitleService
  ) { 
    this.firstFormGroup = this._formBuilder.group({
      vehicleRegNumber: ['', Validators.required],
      kgsControl:['', Validators.required],
      maxVehicleCargoCarryingCapacity:['', Validators.required],
    }); 
  }



  Kgs = [
    { name: '100 Kgs'},
    { name: '1000 Kgs'},
    { name: '5000 Kgs'},
    { name: '7000 Kgs'},
  ];

  ngOnInit(): void {
  }


}
