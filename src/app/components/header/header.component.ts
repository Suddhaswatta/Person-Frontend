import { SharedserviceService } from './../../services/sharedservice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private shared:SharedserviceService) { }
  search = "";
  ngOnInit(): void {
  }
  
  handleSearch(){
    console.log(`Search with ID:${this.search}`);
    if(this.search!=="")
      this.shared.setIsSearchClicked(this.search);
    
  }
}
