/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DiplomaService } from './Diploma.service';
import { StudentService } from '../Student/Student.service'
import { UniversityService } from '../University/University.service'
import { ProgramService} from '../Program/Program.service'
import { Diploma} from '../org.diploma'
import 'rxjs/add/operator/toPromise';
declare var $: any;
@Component({
  selector: 'app-diploma',
  templateUrl: './Diploma.component.html',
  styleUrls: ['./Diploma.component.css'],
  providers: [DiplomaService, StudentService, UniversityService, ProgramService ]
})

export class DiplomaComponent implements OnInit {

  myForm: FormGroup;
  
  private result;
  private allAssets;
  private asset;
  private currentId;
  private errorMessage;
  info = new Diploma;

  diplomaId = new FormControl('', Validators.required);
  ipfsUrl = new FormControl('', Validators.required);
  valid = new FormControl('', Validators.required);
  date = new FormControl('', Validators.required);
  university = new FormControl('', Validators.required);
  student = new FormControl('', Validators.required);
  program = new FormControl('', Validators.required);

  constructor(public serviceDiploma: DiplomaService, fb: FormBuilder
    , public studentService: StudentService
    , public uniService: UniversityService
    , public proService: ProgramService
    ) {
  };

  ngOnInit(): void {
  }

  searchById(id){
    this.serviceDiploma.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      this.info = result;

      var student = result.student.toString();
    
      var studentId = student.substr(student.indexOf("#") + 1).toString(); // Contains 24 //

      var university = result.university.toString();
      var universityId = university.substr(university.indexOf("#") + 1).toString(); // Contains 24 //

      var pro = result.program.toString();
      var proId = pro.substr(pro.indexOf("#") + 1).toString(); // Contains 24 //

      this.uniService.getparticipant(universityId)
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        this.info.university=result;
      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage = 'Không tìm thấy thông tin';
        } else {
          this.errorMessage = error;
        }
      })

      this.proService.getAsset(proId)
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        this.info.program = result;
      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage = 'Không tìm thấy thông tin';
        } else {
          this.errorMessage = error;
        }
      })

      this.studentService.getparticipant(studentId)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      this.info.student = result;
    console.log(this.info);
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = 'Không tìm thấy thông tin';
      } else {
        this.errorMessage = error;
      }
    });

    $("#successModal").modal('show');

    })
    .catch((error) => {
      this.info=null;

      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = 'Không tìm thấy thông tin';
        $("#failModal").modal('show');
      } else {
        this.errorMessage = error;
      }
    });
  }
}
