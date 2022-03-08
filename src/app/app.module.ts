import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddSheetComponent } from './add-sheet/add-sheet.component';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { DecibelComponent } from './decibel/decibel.component';
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
<<<<<<< HEAD
    DecibelComponent,
=======
>>>>>>> 8ef50f03464d707f66533f55e5ae0e1a85cb15d3
    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgxIndexedDBModule.forRoot(dbConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
