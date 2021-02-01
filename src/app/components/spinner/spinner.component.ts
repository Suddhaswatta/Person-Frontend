import { SharedserviceService } from './../../services/sharedservice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  constructor(private shared:SharedserviceService) { }
  spinner = this.shared.getSpinner()

  ngOnInit(): void {
  
    this.shared.getSpinner().subscribe(x=>{
      console.log(`Event Trigerred :${x}`);
      
    });
    this.shared.getUpdate().subscribe(x=>{
      console.log(`Event Trigerred Update:${x}`);
      
    });

  }

}
