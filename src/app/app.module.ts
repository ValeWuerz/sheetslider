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

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
