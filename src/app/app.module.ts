import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddSheetComponent } from './add-sheet/add-sheet.component';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
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
