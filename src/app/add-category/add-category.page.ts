import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IconService } from '../icon.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.page.html',
  styleUrls: ['./add-category.page.scss'],
})
export class AddCategoryPage implements OnInit {
  icon_names = [];
  name: string;
  icon;
  note: string;
  icon_type:string;
  //constuct an array containing the icon names
  constructor(private modalController:ModalController, private iconService:IconService) {  }

  async ngOnInit() {
    this.icon = await this.iconService.getBlank();
    this.icon_names = await this.iconService.getIcons();
  }

  //change the value of icon depending on which icon the user selects
  changeImage(icon_name:string){
    this.icon = icon_name;
  }

  //close the modal and send the updated information to tab1.ts to update the object
  closeModal(){
    this.modalController.dismiss({name: this.name, icon: this.icon, note: this.note});
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
