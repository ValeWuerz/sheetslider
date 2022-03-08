import { Injectable } from '@angular/core';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf';

@Injectable({
  providedIn: 'root'
})
export class RenderSheetService {

  constructor() { }

  render_multi(pdf:any, element:any){

    let reader = new FileReader();
    reader.readAsArrayBuffer(pdf)
     reader.onload = () =>{
  var typedarray = new Uint8Array(<ArrayBuffer>reader.result);

  pdfjs.getDocument(typedarray).promise.then((pdf) => {
    for(let i=1; i<=pdf.numPages;i++ ){
    pdf.getPage(i).then( (page) =>  {
      var viewport = page.getViewport({scale:1});
      let can= document.createElement('canvas')
      can.setAttribute("id", "sheet_"+i);
      element.appendChild(can);
      var canvas = document.getElementById("sheet_"+i) as HTMLCanvasElement;
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      canvas.style.width="100%"
      page.render({
        canvasContext: canvas.getContext('2d')!,
                  viewport: viewport
                  
      });
     
    });
  }
   });
    }
  }
  remove_childs(node:any){
    let parent=node
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild)
      
    }
  }
 
}
