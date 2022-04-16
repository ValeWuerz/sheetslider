import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit,AfterViewInit {
  decibel_nr="Mic"

  check: boolean =false
  show_decibel:boolean=true
  scrollcause: number | undefined;
  decibel: number | undefined
  editor_opened: boolean=false
  cut_box: Array<string>=["0","0"]
  chosen_layer:string=""
  targetted_sheet={
    page:"",
    height:"",
  }
  dialog_var:string="Start Cutting"
  target_reference:any
  @ViewChild('decibel', { static: false }) decibel_num!: ElementRef;
  @ViewChild('sheet', { static: false }) sheet!: ElementRef;
    check1: boolean = true;
    scrollinterval: number | undefined;
    speed: number =20;
    cut_range: number=0
    cut_range_bottom: number=0
pdfSrc!:Uint8Array;
display_scroll=true

  constructor() {
   
   }
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
   
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
  let controller = new AbortController
  let element= document.getElementsByClassName("ng2-pdf-viewer-container")[0]
  let pageNumber=1
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
    behavior: 'smooth'
  })
this.dialog_var="Proceed Cut"


cut_range.addEventListener("mousemove", (ev)=>{
  
  let range_input=this.cut_range.toString().slice()
  this.cut_box[0]=range_input.slice()
  page.style.clipPath=`inset(${this.cut_box[0]}px 0px 0px 0px)`
  console.log(this.cut_box);

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
    top: (height*pageNumber)/2,
    left:0,
    behavior: 'smooth'
  })
  document.getElementById("cut_range_bottom").addEventListener("mousemove", (ev)=>{
    let range_input=this.cut_range_bottom.toString().slice()
    this.cut_box[1]=range_input.slice()
    page.style.clipPath=`inset(${this.cut_box[0]}px 0px ${this.cut_box[1]}px 0px)`
  console.log(this.cut_box);

      })
this.dialog_var="Proceed Cut"

}
else if(this.dialog_var=="Proceed Cut"){
  alert("cutted")
   this.dialog_var="Bottom"
 
 }
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
    behavior: 'smooth'
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
      behavior: 'smooth'
    }); }, 100-this.speed);
  
}
clearintervals(){
  window.clearInterval(this.scrollinterval);
  window.clearInterval(this.scrollcause);

}
}


