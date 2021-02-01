import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/models/student';
import { FormBuilder,FormControl, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {

  constructor
  (
    @Inject(MAT_DIALOG_DATA) public student: Student,
    private fb:FormBuilder,
    private service:StudentService 
  ){}
  
  // public student=new Student("","","","",new Date(),"","","");
  sections=['A','B','C','D']
  standards = ['1','2','4','5','6','7','8','9','10','11','12']

  studentForm = this.fb.group({
    firstname:[this.student.firstname,[Validators.required,Validators.minLength(3)]],
    lastname:[this.student.lastname,[Validators.required,Validators.minLength(3)]],
    standard:[this.student.standard,[Validators.required]],
    section:[this.student.section,[Validators.required]],
    dob:[this.student.dob,[Validators.required]],
    age:[this.student.age,[Validators.required]],
  })
  
  
  
  ngOnInit(): void {
  }

  save(){
    if(this.studentForm.valid){
      const student:Student = this.studentForm.value;
      if(JSON.stringify(this.student) !== JSON.stringify({}))
        student.id = this.student.id;
      this.service.save(student).subscribe();
    }
    
  }

  getErrorMessageFirstName() {
    
    if(this.studentForm.get('firstname').hasError('required'))
      return 'Firstname cannot be blank';
    else if(this.studentForm.get('firstname').hasError('minlength'))  
      return 'Firstname Must be of minimum 3 characters';
     
       
  }
  getErrorMessageLastname(){
  if(this.studentForm.get('lastname').hasError('required'))  
    return 'Lastname cannot be blank'; 
  else if(this.studentForm.get('lastname').hasError('minlength'))  
    return 'Lastname must be of minimum 3 characters';
  
  }

  getErrorMessageStandard(){
    if(this.studentForm.get('standard').hasError('required'))  
    return 'Standard Cannot be blank'; 
  
  }
  getErrorMessageSection(){
  if(this.studentForm.get('section').hasError('required'))  
    return 'Section cannot be blank'; 
  
  }

  getErrorMessageAge(){
  if(this.studentForm.get('age').hasError('required'))  
    return 'Age cannot be Blank'; 
  }

  getErrorMessageDOB(){
    if(this.studentForm.get('dob').hasError('required'))  
    return 'Date of birth cannot be blank'; 
  
  
  }

}
