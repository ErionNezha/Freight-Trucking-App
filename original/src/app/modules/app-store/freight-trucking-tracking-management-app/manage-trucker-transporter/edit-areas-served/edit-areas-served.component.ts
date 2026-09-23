import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';

@Component({
  selector: 'app-edit-areas-served',
  templateUrl: './edit-areas-served.component.html',
  styleUrls: ['./edit-areas-served.component.scss']
})
export class EditAreasServedComponent implements OnInit {
  firstFormGroup!:FormGroup;
  firstFormValues: any;

  constructor(
    private _httpClient: HttpClient,
    private _formBuilder: FormBuilder,
    private _headerTitle: HeaderTitleService
  ) {
    this.firstFormGroup = this._formBuilder.group({
      selectControl: ['', Validators.required],
    });
   }


  ngOnInit(): void {
  }
  
    // select  numberOfWheels options
    // numberOfWheels = [
    //   { name: '4 Wheeler' },
    //   { name: '6 Wheeler' },
    //   { name: '10 Wheeler' },
    //   { name: '12 Wheeler' },
    //   { name: '14 Wheeler' },
    //   { name: '16 Wheeler' },
    //   { name: '20 Wheeler' },
    //   { name: '24 Wheeler' },
    // ];




    onFormSubmit({ value, valid }: { value: any; valid: boolean }) {
      // console.log('submit', this.myForm.submitted);
      this.firstFormValues = value;
      // console.log(value, valid);
    }
  

}
