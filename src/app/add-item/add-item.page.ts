import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { IconService } from '../icon.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {
  cat_id: number;
  name:string;
  icon:string = "blank.png";
  brand:string;
  date:Date;
  shade:string;
  favourite:boolean;
  quantity:number;
  note:string;
  icon_names=[];
  //constuct an array containing the icon names
  constructor(private navParams:NavParams, private modalController:ModalController, private iconService:IconService) {}

  async ngOnInit() {
    this.icon = await this.iconService.getBlank();
    this.icon_names = await this.iconService.getIcons();
  }

  //change the value of icon depending on which icon the user selects
  changeImage(icon_name:string){
    this.icon = icon_name;
  }
  
  //close the modal and send the updated information to item.ts to update the object
  closeModal(){
    this.modalController.dismiss({cat_id: this.cat_id, name: this.name, icon: this.icon, brand: this.brand, date: this.date, shade: this.shade, favourite: this.favourite, quantity: Number(this.quantity), note: this.note});
  }
  //read the data from the file passed in 
  imageSelected(files){
    let fileReader = new FileReader();
    fileReader.onload = e => {
      this.icon = String(fileReader.result);
    };
    fileReader.readAsDataURL(files[0]);
  }
}
