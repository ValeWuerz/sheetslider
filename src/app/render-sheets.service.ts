import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RenderSheetsService {

  constructor() { }
  remove_childs(node:any){
    let parent=node
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild)
      
    }
  }
}
