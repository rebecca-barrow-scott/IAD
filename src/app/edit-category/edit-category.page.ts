import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { IconService } from '../icon.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.page.html',
  styleUrls: ['./edit-category.page.scss'],
})
export class EditCategoryPage implements OnInit {
  name:string;
  icon_path:string;
  icon:string;
  note:string;
  icon_names=[];
  //constuct an array containing the icon names
  constructor(private navParams:NavParams, private modalController:ModalController, private iconService:IconService) {}
   
  //get the item attributes passed to the modal from tab1.ts
  async ngOnInit() {
    this.name = this.navParams.get("name");
    this.icon_path = this.navParams.get("icon_path")
    this.icon = this.navParams.get("icon");
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

  //close the modal and send the updated information to tab1.ts to update the object
  closeModal(){
    this.modalController.dismiss({name: this.name, icon: this.icon, note: this.note});
  }
}
