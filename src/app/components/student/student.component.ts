import { SureComponent } from './../sure/sure.component';
import { SharedserviceService } from './../../services/sharedservice.service';
import { StudentService } from './../../services/student.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateStudentComponent } from '../create-student/create-student.component';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private service:StudentService,private shared:SharedserviceService,private dialog:MatDialog) { }

  public students$;
  public options$;
  public ageOptions;
  public sectionOptions;
  public standardOptions;
  private isFilter=false;
  public filterRequest={
    "age":"",
    "section":"",
    "standard":""
  };
  ngOnInit(): void {

    this.refresh()
    this.shared.getUpdate().subscribe(x =>{
      console.log(`Event Received Update: ${x}`);
      this.refresh()
    })

    this.shared.getIsSearchClicked().subscribe((id:string) =>{
      // console.log(`Event Received : ${id}`);
        this.getById(id)
    })

  }

  refresh(){
  this.getAll()
  this.loadAllOptions()
  }

  private getAll(){
    this.students$ = this.service.getAll();
  }

  private getById(id:string){
    this.students$ = this.service.getById(id);
  }

  private loadAllOptions(){
    this.options$ = this.service.loadFilterOptions()
    this.options$.subscribe(
      x=>{
        console.log();
        this.ageOptions = x.ageOptions
        this.sectionOptions = x.sectionOptions
        this.standardOptions = x.standardOptions
      })
    }

    applyFilter($event){

      if($event.target.checked===true){
        this.isFilter = true;
      }else{
        this.refresh()
        this.isFilter = false;
      }
      

    }

    filterSelect($event){
      
      if(this.isFilter){
        this.filterRequest[$event.target.name]=$event.target.value;
        console.log(JSON.stringify(this.filterRequest));
        this.students$ = this.service.filter(this.filterRequest);
      }else{
        this.filterRequest = {
          "age":"",
          "section":"",
          "standard":""
        }
      }
    }


    handleSave(student={}){
      
      // console.log(`Student to saved :${JSON.stringify(student)}`);
      
      this.dialog.open(
        CreateStudentComponent,
        {
          // height: '65%',
          // width: '70%',
          data:student,
          panelClass:'custom',
          disableClose : false,
          autoFocus :true
        })

    }

    handleDelete(id:string){
      
      const ref = this.dialog.open(SureComponent);
      ref.afterClosed().subscribe(x=>{
        if(x==true){
          this.service.delete(id).subscribe();
        }
      })
    }
}
