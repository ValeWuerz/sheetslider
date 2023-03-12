import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
declare var init_smiley:any;
declare var stopvideo:any;
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
  pageNumber: number=1
  chosen_layer:string=""
  targetted_sheet={
    page:"",
    height:"",
  }
  dialog_var:string="Start Cutting"
  target_reference:any
  @ViewChild('decibel', { static: false }) decibel_num!: ElementRef;
  @ViewChild('cutter', { static: false }) cutter!: ElementRef;
  @ViewChild('sheet', { static: false }) sheet!: ElementRef;
    check1: boolean = true;
    scrollinterval: number | undefined;
    speed: number =60;
    cutbox: any=[]
    page_height:number=0
pdfSrc!:Uint8Array;
display_scroll=true

  constructor(public dbService: NgxIndexedDBService) {
   
   }
  ngOnInit(): void {
    //this.stopvideo()
    this.init_smiley()
  }
  init_smiley(){
    new init_smiley()
  }
  stopvideo(){
    new stopvideo()
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
  

}

init_cutting(){
this.show_decibel=!this.show_decibel
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
pageRendered(e: CustomEvent) {
  this.regular_cut()
}
regular_cut(){
  let key=this.srckey
  let name=key.name
  this.dbService.getAll('sheets').subscribe((sheets:any)=>{
    let sheet = sheets.findIndex((element:any)=>element.name==name)
    if (sheets[sheet]["cutbox"]!=undefined) {
      let cutbox= sheets[sheet]["cutbox"] 
      console.log(cutbox);
  let page_one=document.querySelector(`[data-page-number=\"1\"`)! as HTMLElement
  let height =parseInt((page_one.style.height.slice(0,-2)))
  let i=0
  let j=1
  let pagenr=1
  for (let pages = 0; pages < (cutbox.length/2); pages++) {
    let top= cutbox[i]
    let bottom= height - cutbox[j]
  let page=document.querySelector(`[data-page-number=\"${pagenr}\"`)! as HTMLElement
  console.log(page);
  
  page.style.clipPath= `inset(${top}px 0px ${bottom}px 0px)`
  if (pagenr>1) {
    let new_top_margin=-((height - cutbox[j-2]) + cutbox[i])
    page.style.marginTop=`${new_top_margin}px`
  }
  page.style.marginBottom="0px"
  i=i+2
  j=j+2
  pagenr=pagenr+1
    }
    
}
else{
  console.log("no cutbox existent");
  
}
      })
  
}
apply_cut(){
  if (this.cutter.nativeElement.innerHTML=="Cut") {
    
  
  let i=0
  let j=1
  let pagenr=1
  for (let pages = 0; pages < (this.cutbox.length/2); pages++) {
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
this.cutter.nativeElement.innerHTML="Save"
}
else{
  let key=this.srckey
  let name=key.name
  let imageUrl=key.imageUrl
  this.dbService.getAll('sheets').subscribe((sheets:any)=>{
let sheet = sheets.findIndex((element:any)=>element.name==name)
this.dbService.update('sheets', {
  id: sheets[sheet]["id"],
  imageUrl: imageUrl,
  name: name,
  cutbox: this.cutbox
 }).subscribe((key) => {
console.log("Cutbox Saved");
console.log(key);

  
 });

  })
}
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
  let starttime:any;
  let endtime:any;
  let element= document.getElementsByClassName("ng2-pdf-viewer-container")[0]


  console.log("Speed: "+(100-this.speed));
  
  this.scrollinterval= window.setInterval(() => { 
  if (element.scrollTop>1007 &&element.scrollTop<1008) {
    starttime=new Date()
    console.log("Start "+ starttime);
    
  }
  else if(element.scrollTop>2006 && element.scrollTop<2007){
    endtime= new Date()
    let diff= endtime-starttime
    console.log("DIFFERENCE: "+diff);
    console.log("End "+ endtime);

    
  }



    
    element.scrollBy({
      top: 1,
      left:0,
      behavior: 'auto'
    }); }, /* 100-this.speed */ 15);
  
}
clearintervals(){
  window.clearInterval(this.scrollinterval);
  window.clearInterval(this.scrollcause);

}
}


