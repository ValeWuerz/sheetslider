import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { jsPDF } from "jspdf";

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
  @Output() sendkey = new EventEmitter<any>();

  sheetname: string |undefined
  new_sheetname: string
  files: FileList | null | undefined;
  showinput: boolean = true ;
  data:Array<string>=[];
currentImage:HTMLImageElement
pdf_name:string
  constructor(public dbService: NgxIndexedDBService) { }
  ngAfterViewInit(): void {
    
    const fileInput =<HTMLInputElement>this.input.nativeElement
  
  fileInput.onchange =async () => {
    const selectedFile = fileInput.files
    console.log(selectedFile);
    if (selectedFile[0].type=="image/png" || selectedFile[0].type=="image/jpeg") {
      for(let i=0; i<selectedFile.length;){
        var file = selectedFile[i]
        this.pdf_name=file.name
          console.log(file)
          let image= document.createElement('img')
          image.src = URL.createObjectURL(file);
          console.log(image.width);
          console.log(image.height);
          
          let typ: string;
          image.onload =async ()=>{
            console.log(i);
            this.currentImage=image
            //Draw the image onto the canvas.
            let canvas:any = document.getElementById("canvas")
            
            canvas.width=image.width 
        canvas.height=image.height
            let context:any=canvas.getContext("2d")
            await context.drawImage(image, 0, 0);
            let data;
            console.log(file);
            
            if (file.type=="image/png") {
              
              data= canvas.toDataURL("image/png")
              typ="PNG"
            }
            else if(file.type=="image/jpeg"){
              data= canvas.toDataURL("image/jpeg")
              typ="JPEG"
            }
          
          this.data[i-1]=data
          
          console.log(this.data);
          
        }
        
          document.getElementById('canvas')?.appendChild(image);
          i++
          if (i>=selectedFile.length) {
            
            let canvas:any = document.getElementById("canvas")
    
    console.log("Width:"+canvas.offsetWidth);
    console.log("Height:"+canvas.offsetHeight);
    
    //let data= canvas.toDataURL("image/png")
    console.log(this.data);
    
    if (this.data[0]==undefined) {
      
      setTimeout(()=>{
        const componentWidth = /* canvas.offsetWidth *//* 2234 */this.currentImage.width
        const componentHeight = /* canvas.offsetHeight *//* 3178 */this.currentImage.height
        const doc = new jsPDF('p','px');
        doc.internal.pageSize.width = componentWidth
        doc.internal.pageSize.height = componentHeight 
        doc.addImage(this.data[0],typ,0,0,componentWidth,componentHeight,undefined,'FAST')
        for (let i = 1; i < this.data.length; i++) {
          
          doc.addPage()
          doc.internal.pageSize.width = componentWidth
          doc.internal.pageSize.height = componentHeight
          doc.addImage(this.data[i],typ,0,0,componentWidth,componentHeight,undefined,'FAST')
        }
        let time=new Date()
        const myFile = new File([doc.output('blob')], 'testing.jpeg', {
          type: "application/pdf",
          lastModified:parseInt(time.toDateString())
      });
        this.new_sheetname = prompt("Sheetname: ")
        this.dbService.add('sheets', {
          /* name: this.pdf_name.slice(0,24), */
          name: this.new_sheetname,
          imageUrl: myFile
        }).subscribe((key) => {
          console.log('key: ', key);
          this.render_new(myFile)
          this.send_key(key)
        });
      
      }, 10000);
    }
    
    
          }
          
        }
    }
    else{
    this.dbService.add('sheets', {
      name: selectedFile![0]["name"].slice(0,24),
      imageUrl: selectedFile![0]
    }).subscribe((key) => {
      console.log('key: ', key);
      this.render_new(selectedFile![0])
      this.send_key(key)
    });
    //location.reload()
  }}
  }
  
  ngOnInit(): void {
    
   
  }
  save_pdf(){

    let canvas:any = document.getElementById("canvas")
    const componentWidth = canvas.offsetWidth
    const componentHeight = canvas.offsetHeight
    //let data= canvas.toDataURL("image/png")
    const doc = new jsPDF('p','px');
    doc.internal.pageSize.width = componentWidth
    doc.internal.pageSize.height = componentHeight 
    doc.addImage(this.data[0], "PNG",0,0,componentWidth,componentHeight)
    
    for (let i = 1; i < this.data.length; i++) {
      
      doc.addPage()
      doc.internal.pageSize.width = componentWidth
      doc.internal.pageSize.height = componentHeight
      doc.addImage(this.data[i], "PNG",0,0,componentWidth,componentHeight)
    }
  
  
    doc.save("testing.pdf")
    console.log(doc.output());
    var blobPDF =  new Blob([ doc.output() ], { type : 'application/pdf'});
    console.log(blobPDF);
    
  var blobUrl = URL.createObjectURL(blobPDF);  //<--- THE ERROR APPEARS HERE
    
  }
  render_new(selected:any){
    this.render.emit(selected);
  }
  send_key(key:any){
    this.sendkey.emit(key)
  }
inputing(){
this.input.nativeElement.click()
}
  

}
