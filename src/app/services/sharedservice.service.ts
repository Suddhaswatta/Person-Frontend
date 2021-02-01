import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedserviceService {

  constructor() { }

  private isSearchCliked$ = new Subject();
  private update$ = new Subject();
  private startSpinner$ = new BehaviorSubject(false);

  public getIsSearchClicked(){
    return this.isSearchCliked$.asObservable()
  }
  
  public setIsSearchClicked(value){
    this.isSearchCliked$.next(value)
  }

  public getUpdate(){
    return this.update$.asObservable()
  }
  public setUpdate(value){
    this.update$.next(value)
  }

  public setSpinner(value){
    this.startSpinner$.next(value)
  }
  
  public getSpinner():Observable<Boolean>{
    return this.startSpinner$.asObservable()
  }
}
