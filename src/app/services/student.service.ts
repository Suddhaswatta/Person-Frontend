import { SureComponent } from './../components/sure/sure.component';
import { SharedserviceService } from './sharedservice.service';
import { ErrorMessageComponent } from './../components/error-message/error-message.component';
import { Options } from './../models/options';
import { Student } from './../models/student';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`)
    .pipe(
      map( x=>
        {
          this.shared.setSpinner(true);
          console.log(`Deleted Success : ${x}`);
          this.shared.setSpinner(true);
          this.shared.setUpdate(true);
          
          return x;
        }
            
         )
    );
  }
  constructor(private http:HttpClient,private dialog:MatDialog,private shared:SharedserviceService) { }
  save(student: Student) {
    console.log(`Value to be Saved: ${JSON.stringify(student)}`);
    
    return this.http.post<Student>(`${this.baseUrl}/students`,student)
    .pipe(
      map((student:Student)=>{

        this.shared.setUpdate(true)
        return student;
      }),
      catchError(e=>{
        console.log(e);
        return throwError(e)
      })
    )
  }

  
  
  private baseUrl = environment.SERVER_URL;

  getAll():Observable<Student[]>{

    return this.http.get<Student[]>(`${this.baseUrl}/students`)
    .pipe(
      map((students:Student[])=>{
        this.shared.setSpinner(true)
          
        students.map((student:Student)=>{

          // console.log(`Student : ${JSON.stringify(student)}`);
        })
        this.shared.setSpinner(false)
          return students
        }),
      catchError(error=>{
          

          // console.log(`Error : ${JSON.stringify(error)}`);
          return throwError(error);
        })
      );

  }

  getById(id):Observable<Student[]>{

    return this.http.get<Student>(`${this.baseUrl}/students/${id}`)
    .pipe(
      map((student:Student)=>{
        this.shared.setSpinner(true)
          const students:Student[] = [];
          // console.log(`Get By ID: ${JSON.stringify(student)}`);
          students.push(student)
          this.shared.setSpinner(false)
          return students
        }),
      catchError(error=>{

        this
        .dialog
        .open(ErrorMessageComponent,
         {'data':error.error})
          console.log(`Error : ${error.error}`);
          return throwError(error);
        })
      );

  }

  loadFilterOptions(){
    return this.http.get<Options>(`${this.baseUrl}/options`)
  }

  filter(filterObject){
    if(filterObject['age']=='' && filterObject['section']=='' && filterObject['standard']=='')
      this.getAll()
    else 
      return this.http.post<Student[]>(`${this.baseUrl}/filter`,filterObject)
    .pipe(
      map((students:Student[])=>{
        this.shared.setSpinner(true)
        console.log(`Filter Fetched : ${students}`);
        this.shared.setSpinner(false)
        return students;
      }

      )
    )
  }
}
