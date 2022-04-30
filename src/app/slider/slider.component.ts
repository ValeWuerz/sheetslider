import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit,AfterViewInit {
  decibel_nr="Mic"
  srckey:any
  check: boolean =false
  show_decibel:boolean=true
  scrollcause: number | undefined;
  decibel: number | undefined
  editor_opened: boolean=false
  cut_box: Array<string>=["0","0"]
  pageNumber: number=1
  chosen_layer:string=""
  targetted_sheet={
    page:"",
    height:"",
  }
  dialog_var:string="Start Cutting"
  target_reference:any
  cutvars:Array<Object>=[]
  @ViewChild('decibel', { static: false }) decibel_num!: ElementRef;
  @ViewChild('sheet', { static: false }) sheet!: ElementRef;
    check1: boolean = true;
    scrollinterval: number | undefined;
    speed: number =60;
    cut_range: number=0
    cut_range_bottom: number=0
    cutbox: any=[]
    page_height:number=0
pdfSrc!:Uint8Array;
display_scroll=true

  constructor(public dbService: NgxIndexedDBService) {
   
   }
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
  let element= document.getElementsByClassName("ng2-pdf-viewer-container")[0]
   element.addEventListener('touchmove',  ()=> {
       this.decibel=0
       //to enable manual scrolling while mic is on
       
   })
    document.addEventListener("deviceready", this.onDeviceReady, false);
      this.initialisieren()
let ngcontainer=<HTMLElement>document.getElementsByClassName("ng2-pdf-viewer-container")[0]
ngcontainer.style.overflowX="hidden"
}
  onDeviceReady(even:any) {
console.log("ready");

  }
  getCursorPos(a:any){
console.log(a.pageY);

  }
getclass(){
  if (this.display_scroll) {
    document.styleSheets[0].insertRule(
      ".ng2-pdf-viewer-container::-webkit-scrollbar {display: none;}"
      , 0);
      this.display_scroll=!this.display_scroll
  }
  else{
    document.styleSheets[0].deleteRule(0)
    this.display_scroll=!this.display_scroll

  }
  
 
}
open_editor(){
  
this.editor_opened=!this.editor_opened
this.show_decibel=!this.show_decibel
if (this.editor_opened) {

}
}
dialog(){
  let cut_range= document.getElementById("cut_range")
let cut_range_bottom= document.getElementById("cut_range_bottom")
  let element= document.getElementsByClassName("ng2-pdf-viewer-container")[0]
  let pageNumber=this.pageNumber
  let page=document.querySelector(`[data-page-number=\"${pageNumber}\"`)! as HTMLElement

  let height=parseInt(page.style.height)
if (this.dialog_var=="Start Cutting") {
this.dialog_var="Top"
}
else if(this.dialog_var=="Top"){
cut_range.style.display="block"
cut_range_bottom.style.display="none"
   element.scrollTo({
    top: height*pageNumber -height,
    left:0,
  })
this.dialog_var="Proceed Cut"


cut_range.addEventListener("mousemove", (ev)=>{
  
  let range_input=this.cut_range.toString().slice()
  this.cut_box[0]=range_input.slice()
  page.style.clipPath=`inset(${this.cut_box[0]}px 0px 0px 0px)`
  let line = document.getElementById('line')
      page.appendChild(line)
      console.log("Page:");
      console.log(page);
      line.style.top=(parseInt(this.cut_box[0])+1).toString() + "px" 
    
  console.log(this.cut_box);

    })
    cut_range.addEventListener("touchmove", (ev)=>{
  
      let range_input=this.cut_range.toString().slice()
      this.cut_box[0]=range_input.slice()
      page.style.clipPath=`inset(${this.cut_box[0]}px 0px 0px 0px)`
      console.log("Page:");
      console.log(page);
      
      console.log(this.cut_box);
      let line = document.getElementById('line')
      page.appendChild(line)
      line.style.top=(parseInt(this.cut_box[0])+1).toString() + "px" 
    
        })
  
}
else if(this.dialog_var=="Proceed Cut"){
  cut_range.style.display="none"
cut_range_bottom.style.display="block"
 alert("cutted")
  this.dialog_var="Bottom"

}
 
else if(this.dialog_var=="Bottom"){
  element.scrollTo({
    top: (height*pageNumber)-height/2,
    left:0,
    behavior: 'smooth'
  })
  document.getElementById("cut_range_bottom").addEventListener("mousemove", (ev)=>{
    let range_input=this.cut_range_bottom.toString().slice()
    this.cut_box[1]=range_input.slice()
    console.log("Page:");
    console.log(page);
    page.style.clipPath=`inset(${this.cut_box[0]}px 0px ${this.cut_box[1]}px 0px)`
    let line = document.getElementById('line')
  page.appendChild(line)
  line.style.top=page.style.height  
  let new_top=(parseInt(page.style.height.slice(0,-2))-parseInt(this.cut_box[1]) -1).toString() +"px"
  line.style.top=new_top
  console.log(this.cut_box);

      })
      document.getElementById("cut_range_bottom").addEventListener("touchmove", (ev)=>{
        let range_input=this.cut_range_bottom.toString().slice()
        this.cut_box[1]=range_input.slice()
        page.style.clipPath=`inset(${this.cut_box[0]}px 0px ${this.cut_box[1]}px 0px)`
        let line = document.getElementById('line')
      page.appendChild(line)
      line.style.top=page.style.height  
      let new_top=(parseInt(page.style.height.slice(0,-2))-parseInt(this.cut_box[1]) -1).toString() +"px"
      line.style.top=new_top
      console.log(this.cut_box);
    
          })
this.dialog_var="Next"

}

 else if(this.dialog_var=="Next"){
   let clone= [...this.cut_box]
   this.cut_box=clone
   this.store_in_cutvars(this.cut_box, pageNumber)
  this.dbService.getAll('sheets').subscribe((sheets) => {
    console.log(sheets);
    let sheetname = this.srckey["name"]
    console.log("Sheetname: "+sheetname);
    let all_sheets =<any>sheets 
    let key = all_sheets.findIndex(((sheet: { [x: string]: any; }) => sheet["name"]==sheetname))
    let specific_reference:any=sheets[key]
    console.log(specific_reference.id);
    this.dbService.update("sheets",
    {
      "id":specific_reference.id,
      "name":specific_reference.name,
      "imageUrl": specific_reference.imageUrl,
      "cutvars":this.cutvars
    }
    ).subscribe((obs)=>{
      console.log("Observed");
      console.log(obs);
      
    })
    

  });
this.pageNumber=this.pageNumber+1
this.dialog_var="Top"




 }
}
dialog2(){
  let element= document.getElementsByClassName("ng2-pdf-viewer-container")[0]
  let whole = document.getElementsByClassName("pdfViewer removePageBorders")[0]
  let page=document.querySelector(`[data-page-number=\"1\"`)! as HTMLElement
  let pageheight= parseInt(page.style.height.slice(0,-2))

  let all_pages= document.querySelectorAll(".page")
    for (let i = 0; i < all_pages.length; i++) {
      let current  =all_pages[i] as HTMLElement
      let pagenr= parseInt(current.getAttribute("data-page-number"))
      current.addEventListener("click", (event)=>{
        this.page_height=parseInt(current.style.height.slice(0,-2))
        console.log(pagenr);
        
          let position= event.clientY + element.scrollTop - (pageheight+10)*(pagenr-1)
          console.log("Position:"+position);
          console.log("ClientY:"+event.clientY);
          console.log("Scrolled:"+element.scrollTop);
          let line = document.createElement("div")
          line.style.position="absolute"
          line.style.width="80%"
          line.style.height="1px"
          line.style.userSelect="none"
          line.style.backgroundColor="red"
          line.id=`line_page${pagenr}`
          line.style.top=`${position}px`
          current.appendChild(line)
          this.cutbox.push(position)
          console.log(this.cutbox);
          
          
        })
    }

}
apply_cut(){
  let i=0
  let j=1
  let pagenr=1
  for (let pages = 0; pages < 14; pages++) {
    let top= this.cutbox[i]
    let bottom=this.page_height - this.cutbox[j]
  let page=document.querySelector(`[data-page-number=\"${pagenr}\"`)! as HTMLElement
  console.log(page);
  console.log(this.cutbox);
  page.style.clipPath= `inset(${top}px 0px ${bottom}px 0px)`
  if (pagenr>1) {
    let new_top_margin=-((this.page_height - this.cutbox[j-2]) + this.cutbox[i])
    console.log("new Margin: "+ new_top_margin);
    
    page.style.marginTop=`${new_top_margin}px`
  }
  page.style.marginBottom="0px"
  i=i+2
  j=j+2
  pagenr=pagenr+1
}
}

store_in_cutvars(cut_box:any, pageNumber:any){
  let pagecorrection = pageNumber-1
  let element={
    top: cut_box[0],
    bottom: cut_box[1]
  }
  this.cutvars.push(element)
  
  console.log("cutvars: "+this.cutvars);
  
}

set_cut(){ 
  if (this.cut_box[0]=="") {
    this.cut_box[0]=this.chosen_layer
    this.create_line()

    alert("Startcut set")
  }
  else{
    this.cut_box[1]=this.chosen_layer
    let pageNumber= this.targetted_sheet.page
    let topcut= (this.cut_box[0]).toString() + "px"
    let bottomcut=(parseInt(this.targetted_sheet.height) -parseInt(this.cut_box[1])).toString() +"px"
    let page=document.querySelector(`[data-page-number=\"${pageNumber}\"`)! as HTMLElement
    let page_following=(parseInt(pageNumber)+1).toString()
    let following_page=document.querySelector(`[data-page-number=\"${page_following}\"`)! as HTMLElement
    let marginTop=`-${bottomcut}`
    this.create_line()
    //page.style.clipPath=`inset(${topcut} 0px ${bottomcut} 0px)`
  /*   alert("cut finished")
    if (following_page==null) {
    }
    else{
      following_page.style.marginTop=marginTop

    }
    if (pageNumber=="1") {
      
    }
    else{
      let current_top_margin=parseInt(page.style.marginTop.slice(0,-2))
      let new_top_margin=(current_top_margin-parseInt(this.cut_box[0])).toString()+"px"
      page.style.marginTop=`${new_top_margin}`
    }
    console.log("cutbox: "+this.cut_box[0]);
    console.log("marginTop: "+page.style.marginTop);
    
    this.cut_box=["",""]  */

  }
}
create_line(){
  let pageNumber=parseInt(this.targetted_sheet.page)
  let specific_page=document.getElementsByClassName('pdfViewer removePageBorders')[0]! as HTMLElement
specific_page.style.margin="0"
  let height=parseInt(this.targetted_sheet.height)
let position = this.chosen_layer + (pageNumber-1) * height
let line = document.createElement("div")
let container = document.getElementById("container")
line.style.position="absolute"
line.style.width="80%"
line.style.height="1px"
line.style.userSelect="none"
line.style.backgroundColor="red"
//container?.appendChild(line)

specific_page.appendChild(line)
console.log("created");
console.log("position: "+position);

line.style.top=`${position}px`


}
scroll(){
  let element= document.getElementsByClassName("ng2-pdf-viewer-container")[0]

  element.scrollBy({
    top: 1,
    left:0,
    behavior: 'auto'
  })
}
initialisieren(){
  let db_num = this.decibel_num.nativeElement
  
      this.scrollbeginn()
  
      db_num!.addEventListener('click', async () => {
        this.check = !this.check
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true
          
        })
        let audio= new AudioContext();
        let analyser = audio.createAnalyser();
            let microphone = audio.createMediaStreamSource(stream);
            let javascriptNode = audio.createScriptProcessor(2048, 1, 1);
            analyser.smoothingTimeConstant = 0.8;
            analyser.fftSize = 1024;
      
            microphone.connect(analyser);
            analyser.connect(javascriptNode);
            javascriptNode.connect(audio.destination);
      
           javascriptNode.onaudioprocess = ()=>  {
                var array = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(array);
                var values = 0;
      
                var length = array.length;
                for (var i = 0; i < length; i++) {
                  values += (array[i]);
                }
      
                var average = values / length;
              console.log((average)); 
  
      if(this.check==false){
        audio.close().then(()=>{
      this.decibel_num.nativeElement.innerHTML="mic"
        });
      }
      this.decibel_num.nativeElement.innerHTML=average.toString();
      this.decibel = average
             
      }
        })
}
scrollbeginn(){
      
  this.scrollcause= window.setInterval(() => {if(Number(this.decibel)>5 ){
    console.log("über 5")
    if(this.check1){
    this.scrollToBottom()
    this.check1=false;
  }
  }
else{
  window.clearInterval(this.scrollinterval);
  this.check1=true;

}}, 1)

  
}
scrollToBottom()  {
  let element= document.getElementsByClassName("ng2-pdf-viewer-container")[0]

  console.log("Speed: "+(100-this.speed));
  
  this.scrollinterval= window.setInterval(() => { 
    element.scrollBy({
      top: 1,
      left:0,
      behavior: 'auto'
    }); }, 100-this.speed);
  
}
clearintervals(){
  window.clearInterval(this.scrollinterval);
  window.clearInterval(this.scrollcause);

}
}


