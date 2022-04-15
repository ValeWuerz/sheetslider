import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit,AfterViewInit {
  decibel_nr="Mic"

  check: boolean =false
  scrollcause: number | undefined;
  decibel: number | undefined
  editor_opened: boolean=false
  @ViewChild('decibel', { static: false }) decibel_num!: ElementRef;
  @ViewChild('sheet', { static: false }) sheet!: ElementRef;
    check1: boolean = true;
    scrollinterval: number | undefined;
    speed: number =20;
pdfSrc!:Uint8Array;
display_scroll=true

  constructor() { }
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
let pageNumber=1
let element= document.getElementsByClassName("ng2-pdf-viewer-container")[0]

let canvas = document.getElementsByTagName("canvas")[1] as HTMLElement
canvas.style.cursor="crosshair"
canvas.style.pointerEvents="none"

let specific_page=document.getElementById('whole-pdf')! as HTMLElement
specific_page.addEventListener('mousemove', function logging(ev) {
  let event:any = ev
  let target=event.target
  console.log(target);
  
  let rect=specific_page.getBoundingClientRect();
  let y= ev.clientY + specific_page.scrollTop - rect.top
  console.log("Y :"+y);
  console.log("clienY :"+ev.clientY);
  console.log("Scroll :"+element.scrollTop);
  console.log("top :"+rect.top);
  
  
let layer=event['offsetY']
  document.getElementById("line")!.style.top=y.toString() + "px"
  
})
/* specific_page.addEventListener('click', function logging(ev) {
  let event:any = ev
let layer=event['offsetY']
  console.log(layer);
  document.getElementById("line")!.style.top=layer.toString() + "px"
  
}) */

//let page=document.getElementsByClassName('page')!
/* pages.forEach(page => {
  page.addEventListener('click', function position(ev) {
    console.log(ev.target);
    console.log("test");
    
  })
  
}); */




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
