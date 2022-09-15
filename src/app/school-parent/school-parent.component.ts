import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SchoolParent } from '../model/school-parent';
import { SchoolParentService } from '../services/school-parent.service';

@Component({
  selector: 'app-school-parent',
  templateUrl: './school-parent.component.html',
  styleUrls: ['./school-parent.component.css']
})
export class SchoolParentComponent implements OnInit {

  @ViewChild('secondDialog', { static: true }) secondDialog: TemplateRef<any> | undefined;
  studentData: any;
  schoolParent = new SchoolParent();
  data1: any;
  register: any;
  secunderyContactNumber = false;
  primaryContactNumber = false;
  zipCodeNumber = false;
  disableAddButton = false;
  sucessMessType = false;
  studentUpdateLabel = false;
  studentAddLabel = false;
  updatedMessageType = false;
  sucessMessage: String = "";
  updateMessage: String = "";
  userName: String = "";
  registerId!: number;
  finalSubmitted = "submitted";
  disableUpdateButton = false;
  disableSubmitButton=false;
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder,
    private schoolParentService: SchoolParentService) { }

  registerStudentForm!: FormGroup;
  studentList: any;
  submitted = false;
  ngOnInit(): void {
    this.registerStudentForm = this.formBuilder.group({
      registerId: [ ],
      parentName: ['', Validators.required],
      studentName: ['', Validators.required],
      address: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      primaryContactPerson: ['', Validators.required],
      primaryContactPersonMobileNo: ['', Validators.required],
      seconderyContactPerson: ['', Validators.required],
      secondoryContactPersonMobileNo: ['', Validators.required],
    });
    this.retrieveData();

  }
  addNewStudentDetails() {
    this.studentAddLabel = true;
    this.modalService.open(this.secondDialog)
  }
  saveStudent() {
    this.submitted = true;
    if (this.registerStudentForm.invalid) {
      return;
    }
    if (this.schoolParent.userAppId != null && this.schoolParent.userAppId != undefined) {
      this.schoolParent.student = this.registerStudentForm.value;
      this.schoolParentService.updateStudent(this.schoolParent).subscribe((data) => {
        this.updatedMessageType = true;
        this.updateMessage = " Student Details Updated SucessFully";
        this.retrieveData();
      },
        (error) => {
          setTimeout(() => {
            this.retrieveData();
            this.modalService.dismissAll();
          }, 1000);
        });
    }
    else {
      this.schoolParent.student = this.registerStudentForm.value;
      console.log(this.schoolParent)
      this.schoolParentService.saveStudent(this.schoolParent).subscribe((data) => {
        this.sucessMessType = true;
        this.sucessMessage = " Register SucessFully";
        setTimeout(() => {
          this.modalService.dismissAll();
        }, 1000);
        this.retrieveData();
      },
      )

    }
  }

  retrieveData() {
    this.schoolParentService.getStudent().subscribe((data) => {
      this.studentData = data.student;
      this.schoolParent.status = data.status;
      this.schoolParent.finalSubmit = data.finalSubmit;
      this.schoolParent.userAppId = data.userAppId;
      this.schoolParent.userName = data.userName;
      this.userName=data.userName;
      this.schoolParent.student = this.studentData;
      this.registerId=this.studentData.registerId;
      this.disableAddButton = true;
      if(this.schoolParent.finalSubmit == "submitted"){
        console.log(this.schoolParent.finalSubmit)
        this.disableUpdateButton = true;
        this.disableSubmitButton=true;
      }
    },
    )
  }
  cancel() {
    this.modalService.dismissAll();
  }
  updateStudentDetails() {
    this.registerStudentForm.patchValue({
      parentName: this.studentData.parentName,
      registerId: this.studentData.registerId,
      studentName: this.studentData.studentName,
      address: this.studentData.address,
      state: this.studentData.state,
      country: this.studentData.country,
      city: this.studentData.city,
      zipCode: this.studentData.zipCode,
      primaryContactPerson: this.studentData.primaryContactPerson,
      primaryContactPersonMobileNo: this.studentData.primaryContactPersonMobileNo,
      seconderyContactPerson: this.studentData.seconderyContactPerson,
      secondoryContactPersonMobileNo: this.studentData.secondoryContactPersonMobileNo,
    });
    this.sucessMessType = false;
    this.studentAddLabel=false;
    this.sucessMessage = "";
    this.studentUpdateLabel = true;
    this.modalService.open(this.secondDialog)
  }
  get myForm() {
    return this.registerStudentForm.controls;
  }

  secondaryPhoneNo(event: any) {
    if (event.target.value.length == 10) {
      this.secunderyContactNumber = false;
    }
    else {
      this.secunderyContactNumber = true;
    }
  }
  primaryPhoneNo(event: any) {
    if (event.target.value.length == 10) {
      this.primaryContactNumber = false;
    }
    else {
      this.primaryContactNumber = true;
    }

  }
  zipCodeValidation(event: any) {
    if (event.target.value.length == 6) {
      this.zipCodeNumber = false;
    }
    else {
      this.zipCodeNumber = true;
    }
  }
  submit(){
    this.schoolParent.finalSubmit= this.finalSubmitted;
    this.schoolParentService.saveStudent(this.schoolParent).subscribe((data) => {
      // this.sucessMessType = true;
      // this.sucessMessage = " Register SucessFully";
      console.log(data);
      setTimeout(() => {
        this.modalService.dismissAll();
      }, 1000);
      this.retrieveData();
    },
    (error) => {
     console.log(error);
    });

  }

  }

