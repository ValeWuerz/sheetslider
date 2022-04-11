import { Component, ViewChild } from '@angular/core';
import { AddPdfComponent } from './add-pdf/add-pdf.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { SliderComponent } from './slider/slider.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  show_menu:Boolean=false
  title = 'sheet-slider';
  @ViewChild('sidemenu', {static:false}) private sidemenu!: SidemenuComponent
  @ViewChild('slider', {static:false}) private slider!: SliderComponent
  showing(){
    if (this.show_menu==false) {
    }
    this.show_menu=!this.show_menu
      
    
  }
  render_sheet(event:any){
    let reader = new FileReader();
    reader.readAsArrayBuffer(event)
     reader.onload = () =>{
  var typedarray = new Uint8Array(<ArrayBuffer>reader.result);
  this.slider.pdfSrc=typedarray
  this.showing()
  
     }   
  
  
  }
 

}
