import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowItemPageRoutingModule } from './show-item-routing.module';

import { ShowItemPage } from './show-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowItemPageRoutingModule
  ],
  declarations: [ShowItemPage]
})
export class ShowItemPageModule {}
