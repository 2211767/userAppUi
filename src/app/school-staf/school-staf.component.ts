import { Component, OnInit } from '@angular/core';
import { SchoolstafService } from '../services/schoolstaf.service';


@Component({
  selector: 'app-school-staf',
  templateUrl: './school-staf.component.html',
  styleUrls: ['./school-staf.component.css']
})
export class SchoolStafComponent implements OnInit {
  searchString: string = "";
  studentList: any;
  circularData: any;
  approveStatus = "Approved";
  rejectedStatus = "Rejected";

  constructor(private stafService: SchoolstafService) { }

  ngOnInit(): void {
    this.retriveStudentDetails();
  }
  retriveStudentDetails() {
    this.stafService.getStudentDetails().subscribe((data) => {
      this.studentList = data;
      console.log(data);
      console.log(this.studentList);
    },
    )
  }
  approve(registerId: String) {
    this.stafService.updateStatus(registerId, this.approveStatus).subscribe((data) => {
      console.log(data);
    },
    (error) => {
      // this.hasErrorOccurred = true;      
      // if (error.message) {
      //   this.errorMessage = error.message;
      // }   
      console.log(error)
    }
    );

  }
  rejected(registerId: String) {
    this.stafService.updateStatus(registerId, this.rejectedStatus).subscribe((data) => {
      console.log(data);
    },
      (error) => {
        // this.hasErrorOccurred = true;      
        // if (error.message) {
        //   this.errorMessage = error.message;
        // }   
        console.log(error)
      }
    );

  }
  sendCircular() {
    console.log(this.circularData);
    this.stafService.updateCircular(this.circularData).subscribe((data) => {
      console.log(data);
    },
    (error) => {
      // this.hasErrorOccurred = true;      
      // if (error.message) {
      //   this.errorMessage = error.message;
      // }   
      console.log(error)
    }
    );
  }

}
