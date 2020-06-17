import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowItemPage } from './show-item.page';

const routes: Routes = [
  {
    path: '',
    component: ShowItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowItemPageRoutingModule {}
