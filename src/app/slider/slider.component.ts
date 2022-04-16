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
  cut_box: Array<string>=["",""]
  chosen_layer:string=""
  targetted_sheet={
    page:"",
    height:"",
  }
  target_reference:any
  @ViewChild('decibel', { static: false }) decibel_num!: ElementRef;
  @ViewChild('sheet', { static: false }) sheet!: ElementRef;
    check1: boolean = true;
    scrollinterval: number | undefined;
    speed: number =20;
    cut_range_top: number=0
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

let canvas = document.getElementsByTagName("canvas")[1] as HTMLElement
canvas.style.cursor="crosshair"
canvas.style.pointerEvents="none"
let pageNumber=1
let page=document.querySelector(`[data-page-number=\"${pageNumber}\"`)! as HTMLElement

let whole_pdf=document.getElementById('whole-pdf')! as HTMLElement
let cut_range_top = document.getElementById('cut_range_top')
let cut_range_bottom = document.getElementById('cut_range_bottom')
page.appendChild(cut_range_top)
page.appendChild(cut_range_bottom)
whole_pdf.addEventListener('mousemove', (ev:MouseEvent)=> {  

  let y= ev.clientY + whole_pdf.scrollTop
  document.getElementById("line")!.style.top=y.toString() + "px"
  let event:any = ev 
  let element = event.target
  this.chosen_layer=event["layerY"]
  
  let reference=element.parentElement.parentElement
  this.targetted_sheet.page=element.parentElement.parentElement.getAttribute("data-page-number")
  if (element.parentElement.parentElement.getAttribute("data-page-number")==null) {
    this.targetted_sheet.page=element.parentElement.getAttribute("data-page-number")
    reference=element.parentElement
  }
  this.target_reference=reference
  this.targetted_sheet.height=element.style.height
  reference!.style.marginBottom="0px"
  reference.style.clipPath=`inset(${this.cut_range_top}px 0px 0px 0px)`  
  reference.style.clipPath=`inset(0px 0px ${this.cut_range_bottom}px 0px)`  
})
cut_range_top.addEventListener('touchmove', (ev:TouchEvent)=>{
  this.target_reference.style.clipPath=`inset(${this.cut_range_top}px 0px 0px 0px)`  
})
cut_range_bottom.addEventListener('touchmove', (ev:TouchEvent)=>{
  this.target_reference.style.clipPath=`inset(${this.cut_range_bottom}px 0px 0px 0px)`  
})

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


