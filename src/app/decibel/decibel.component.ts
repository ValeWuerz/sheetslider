import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-decibel',
  templateUrl: './decibel.component.html',
  styleUrls: ['./decibel.component.scss']
})
export class DecibelComponent implements AfterViewInit {
decibel_nr="mic"
check: boolean =false
scrollcause: number | undefined;
decibel: number | undefined
@ViewChild('decibel', { static: false }) decibel_num!: ElementRef;
  check1: boolean = true;
  scrollinterval: number | undefined;
  speed: number =20;

  constructor() { }

  ngAfterViewInit(): void {
    this.initialisieren();
    document.addEventListener("deviceready", this.onDeviceReady, false);
  }
  onDeviceReady() {
console.log("ready");

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
        /*   var ctx = canvas.getContext("2d"); */
    
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
        this.scrollinterval= window.setInterval(() => { window.scrollBy(0,1); }, this.speed);
        
      }
      clearintervals(){
        window.clearInterval(this.scrollinterval);
        window.clearInterval(this.scrollcause);
      
      }
}
