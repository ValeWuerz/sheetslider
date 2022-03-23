import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddSheetComponent } from './add-sheet/add-sheet.component';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { DecibelComponent } from './decibel/decibel.component';
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
      { name: 'imageUrl', keypath: 'imageUrl', options: { unique: false } }
    ]
  },
  
]
};
@NgModule({
  declarations: [
    AppComponent,
    AddSheetComponent,
    SidemenuComponent,
    DecibelComponent,
    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:5000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
