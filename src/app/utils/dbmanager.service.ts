import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbmanagerService {
  constructor() { }
  static setItem(key  : string,data : string){
   localStorage.setItem(key,data);
  }
  static getItem(key : string){
   let data =  localStorage.getItem(key);
   return data;
  }
  static clearLocal(){
   localStorage.clear();
  }
}
