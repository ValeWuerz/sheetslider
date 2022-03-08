import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-sheet',
  templateUrl: './add-sheet.component.html',
  styleUrls: ['./add-sheet.component.scss']
})
export class AddSheetComponent implements OnInit, AfterViewInit {
  @ViewChild('input', { static: false }) input!: ElementRef;
  @ViewChild('sheetinput', { static: false }) sheetinput!: ElementRef;
  @ViewChild('upload', { static: false }) uploaddiv!: ElementRef;
  sheetname: string |undefined
  files: FileList | null | undefined;
  showinput: boolean = true ;
  constructor(public dbService: NgxIndexedDBService) { }
  ngAfterViewInit(): void {
    pdfjs.GlobalWorkerOptions.workerSrc = '//cdn.jsdelivr.net/npm/pdfjs-dist@2.12.313/build/pdf.worker.js';
    
    const fileInput =<HTMLInputElement>this.input.nativeElement
  
  fileInput.onchange = () => {
    const selectedFile = fileInput.files
    console.log(selectedFile);
    
    this.dbService.add('sheets', {
      name: this.sheetname,
      imageUrl: selectedFile![0]
    }).subscribe((key) => {
      console.log('key: ', key);
    });
    location.reload()
  }
  }
  
  ngOnInit(): void {
    
   
  }
inputing(){
this.input.nativeElement.click()
}
}
