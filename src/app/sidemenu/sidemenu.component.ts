import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { RenderSheetService } from '../render-sheet.service';
import { Sheets } from '../sheets';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
  @ViewChild('list', { static: false }) sheet_list!: ElementRef;
  @ViewChild('active', { static: false }) active!: ElementRef;
  @ViewChild('page', { static: false }) page!: ElementRef;
  @ViewChild('playground', { static: false }) playground!: ElementRef;

sheets: Array<Sheets>=[]
active_sheet: Sheets | undefined
show_menu: boolean = true
filter_exp:string =""
constructor(private dbService: NgxIndexedDBService, private rendering: RenderSheetService){}
ngOnInit(): void {
  
 this.get_database_sheets()

}

get_database_sheets(){
 this.dbService.getAll('sheets').subscribe((sheets:any) => {
   for (let index = 0; index < sheets.length; index++) {
     let note = {
       name:"",
       imageUrl:""
   
     }
   note.name=sheets[index]["name"]
   note.imageUrl=sheets[index]["imageUrl"]
   
   this.sheets.push(note)
   
   }
     this.render_sidemenu(this.sheets)
 });

 
}
filter_sheets(){
    
  let filtered= this.sheets.filter(item=>item["name"].startsWith(this.filter_exp));
  console.log(filtered);
  
  this.rendering.remove_childs(this.sheet_list.nativeElement)
  this.render_sidemenu(filtered)
}

render_sidemenu(target:any){

 for (let index = 0; index < target.length; index++) {
   let reader = new FileReader();

   reader.readAsArrayBuffer(target[index]["imageUrl"])
    reader.onload = () =>{
 var typedarray = new Uint8Array(<ArrayBuffer>reader.result);

 pdfjs.getDocument(typedarray).promise.then((pdf:any) => {
   pdf.getPage(1).then( (page:any) =>  {
     var viewport = page.getViewport({scale:1});
     let can= document.createElement('canvas')
     let label= document.createElement('div')
     label.innerText=target[index]["name"]
     label.setAttribute("class", "bg-slate-500 ")
     can.setAttribute("id", target[index]["name"].toString());
     can.setAttribute("class", "hover:border-yellow-50 hover:border-4" );
     can.addEventListener('click',  (event:any) => {
       
       let sheet_index = event.target['id']   //name
       let searched_sheet = target.findIndex((sheet:any)=>{
         return sheet["name"]==sheet_index
       })
       console.log(target[searched_sheet])
       console.log(sheet_index)
       this.active_sheet=target[searched_sheet]
       let active_url= this.active_sheet["imageUrl"]
       let playground= this.playground.nativeElement
       this.rendering.remove_childs(playground)
       this.rendering.render_multi(active_url,playground)

       
     }  )
     this.sheet_list.nativeElement.appendChild(label)
     this.sheet_list.nativeElement.appendChild(can)
     can.height = viewport.height;
     can.width = viewport.width;
     can.style.width="100%"
      page.render({
       canvasContext: can.getContext('2d'),
                 viewport: viewport
     });

   });

 

 
  });
   }



 }

}

open_menu(){
 if (!this.show_menu) {
 this.render_sidemenu(this.sheets)
   
 }
   this.show_menu=!this.show_menu
   

}


}
