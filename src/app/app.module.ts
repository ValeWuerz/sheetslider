import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SliderComponent } from './slider/slider.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { AddPdfComponent } from './add-pdf/add-pdf.component';
import { FormsModule } from '@angular/forms';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { IonicModule } from '@ionic/angular';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const dbConfig: DBConfig  = {
  name: 'sheets',
  version: 3,
  objectStoresMeta: [{
    store: 'sheets',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      
      { name: 'name', keypath: 'name', options: { unique: false } },
      { name: 'imageUrl', keypath: 'imageUrl', options: { unique: false } },
      { name: 'cutvars', keypath: 'cutvars', options: { unique: false } }
    ]
  },
  
]
};
@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    SidemenuComponent,
    AddPdfComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PdfViewerModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    IonicModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
