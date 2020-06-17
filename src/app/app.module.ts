import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EditCategoryPageModule } from './edit-category/edit-category.module';
import { AddCategoryPageModule } from './add-category/add-category.module';
import { EditItemPageModule } from './edit-item/edit-item.module';
import { AddItemPageModule } from './add-item/add-item.module';
import { ShowItemPageModule } from './show-item/show-item.module';
import { IonicStorageModule } from '@ionic/storage';
import { File } from '@ionic-native/file/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, EditCategoryPageModule, AddCategoryPageModule, EditItemPageModule, AddItemPageModule, ShowItemPageModule, IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
