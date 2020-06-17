import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.page.html',
  styleUrls: ['./show-item.page.scss'],
})
export class ShowItemPage implements OnInit {
  cat_id: number;
  name:string;
  icon:string;
  brand:string;
  date:Date;
  shade:string;
  favourite:boolean;
  quantity:number;
  note:string;

  constructor(private navParams:NavParams, private modalController:ModalController) {}

  //get the item attributes passed to the modal from item.ts
  ngOnInit() {
    this.name = this.navParams.get("name");
    this.icon = this.navParams.get("icon");
    this.brand = this.navParams.get("brand");
    this.date = this.navParams.get("date");
    this.shade = this.navParams.get("shade");
    this.favourite = this.navParams.get("favourite");
    this.quantity = this.navParams.get("quantity");
    this.note = this.navParams.get("note");
  }
  //close the modal
  closeModal(){
    this.modalController.dismiss();
  }

}
