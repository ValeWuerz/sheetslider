import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-add-pdf',
  templateUrl: './add-pdf.component.html',
  styleUrls: ['./add-pdf.component.scss']
})
export class AddPdfComponent implements OnInit {
  @ViewChild('input', { static: false }) input!: ElementRef;
  @ViewChild('sheetinput', { static: false }) sheetinput!: ElementRef;
  @ViewChild('upload', { static: false }) uploaddiv!: ElementRef;
  @Output() render = new EventEmitter<any>();

  sheetname: string |undefined
  files: FileList | null | undefined;
  showinput: boolean = true ;
  constructor(public dbService: NgxIndexedDBService) { }
  ngAfterViewInit(): void {
    
    const fileInput =<HTMLInputElement>this.input.nativeElement
  
  fileInput.onchange = () => {
    const selectedFile = fileInput.files
    console.log(selectedFile);
    
    this.dbService.add('sheets', {
      name: selectedFile![0]["name"],
      imageUrl: selectedFile![0]
    }).subscribe((key) => {
      console.log('key: ', key);
      this.render_new(selectedFile![0])
    });
    //location.reload()
  }
  }
  
  ngOnInit(): void {
    
   
  }
  render_new(selected:any){
    this.render.emit(selected);
  }
inputing(){
this.input.nativeElement.click()
}
  

}
