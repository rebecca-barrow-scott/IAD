import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { IconService } from '../icon.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.page.html',
  styleUrls: ['./edit-item.page.scss'],
})
export class EditItemPage implements OnInit {
  cat_id: number;
  name:string;
  icon:string;
  brand:string;
  date:Date;
  shade:string;
  favourite:boolean;
  quantity:number;
  note:string;
  icon_names=[];
  //constuct an array containing the icon names
  constructor(private navParams:NavParams, private modalController:ModalController,private iconService:IconService) {}
  
  //get the item attributes passed to the modal from item.ts
  async ngOnInit() {
    this.name = this.navParams.get("name");
    this.icon = this.navParams.get("icon");
    this.brand = this.navParams.get("brand");
    this.date = this.navParams.get("date");
    this.shade = this.navParams.get("shade");
    this.favourite = this.navParams.get("favourite");
    this.quantity = this.navParams.get("quantity");
    this.note = this.navParams.get("note");
    this.icon_names = await this.iconService.getIcons();
  }

  //change the value of icon depending on which icon the user selects
  changeImage(icon_name:string){
    this.icon = icon_name;
  }

  //read the data from the file passed in 
  imageSelected(files){
    let fileReader = new FileReader();
    fileReader.onload = e => {
      this.icon = String(fileReader.result);
    };
    fileReader.readAsDataURL(files[0]);
  }

  //close the modal and send the updated information to item.ts to update the object
  closeModal(){
    this.modalController.dismiss({cat_id: this.cat_id, name: this.name, icon: this.icon, brand: this.brand, date: this.date, shade: this.shade, favourite: this.favourite, quantity: Number(this.quantity), note: this.note});
  }

}
