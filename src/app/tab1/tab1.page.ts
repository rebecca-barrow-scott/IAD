import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditCategoryPage } from '../edit-category/edit-category.page';
import { AddCategoryPage } from '../add-category/add-category.page';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { IconService } from '../icon.service';
import { File } from '@ionic-native/file/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ItemService } from '../item.service';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  categories = [];
  id:string;
  name:string;
  icon:string;
  note:string;
  blank:string;
  constructor(private modalController:ModalController, private router:Router, private categoryService:CategoryService, private iconService:IconService, private file:File, private localNotifications:LocalNotifications, private itemService:ItemService) { }
  //get the categories using the category service
  async ngOnInit() {
    this.categories = await this.categoryService.getCategories();
    this.blank = await this.iconService.getBlank();
  }

  //navigates to the items within the category
  categoryItems(i: number){
    this.router.navigateByUrl('items/' + i);
  }

  //create and present the add category modal
  //if the values passed back are null use dafault values
  //else use the values entered into the modal
  async addCategory(){
    const modal = await this.modalController.create({
      component: AddCategoryPage
    });
    modal.onDidDismiss().then((retval)=>{
      if (retval.data != undefined){
        //id
        this.id = "c" + String(this.categories.length)
        //name
        if (retval.data.name == null){
          this.name = "New Category";
        } else {
          this.name = retval.data.name;
        }
        //icon
        if (retval.data.icon == null){
          this.icon = this.blank;
        } else {
          this.icon = retval.data.icon;
        }
        this.note = retval.data.note;
        this.categories.push({id: this.id, name: this.name, icon: this.icon, note: this.note});
        this.categoryService.setCategories(this.categories);
      }
    });
    return modal.present();
  }

  //delete the category from the categories array
  deleteCategory(i: number){
    if (confirm("Delete category " + this.categories[i].name + "?")){
      this.itemService.deleteCatItems(this.categories[i].id);
      this.categories.splice(i, 1);
      this.categoryService.setCategories(this.categories);
    }
  }
  //create the edit category modal and pass the relevent data from the categories array
  //present the edit category modal page
  async editCategory(i: number){
    const modal = await this.modalController.create({
      component: EditCategoryPage,
      componentProps: {
        name: this.categories[i].name,
        icon_path: this.categories[i].icon_path,
        icon: this.categories[i].icon,
        note: this.categories[i].note
      }
    });
    //if the value for an attribute is null then the old value is used 
    //else the new value passed from the modal is used
    modal.onDidDismiss().then((retval)=>{
      if (retval.data != undefined) {
        //id
        this.id = this.categories[i].id
        //name
        if (retval.data.name == ""){
          this.name = this.categories[i].name;
        } else {
          this.name = retval.data.name;
        }
        //icon
        if (retval.data.icon == ""){
          this.icon = this.categories[i].icon;
        } else {
          this.icon = retval.data.icon;
        }
        //note
        if (retval.data.note == ""){
          this.note = "No Note";
        } else {
          this.note = retval.data.note;
        }
        this.categories[i] = {id: this.id, name: this.name, icon: this.icon, note: this.note};
        this.categoryService.setCategories(this.categories);
      }
    });
    return modal.present();
  }
}