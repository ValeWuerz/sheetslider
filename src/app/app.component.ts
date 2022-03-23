import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AddSheetComponent } from './add-sheet/add-sheet.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    
  }
  @ViewChild('child', {static:false}) private addsheet!: AddSheetComponent
  @ViewChild('sidemenu', {static:false}) private sidemenu!: SidemenuComponent
  title = 'sheetslider';
  showing(){
    if (this.sidemenu.show_menu==false) {
      this.sidemenu.render_sidemenu(this.sidemenu.sheets)
    }
    this.sidemenu.show_menu=!this.sidemenu.show_menu
      
    this.addsheet.showinput=!this.addsheet.showinput
    
  }
}
