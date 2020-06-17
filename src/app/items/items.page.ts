import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EditItemPage } from '../edit-item/edit-item.page';
import { AddItemPage } from '../add-item/add-item.page';
import { ShowItemPage } from '../show-item/show-item.page';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  items = [];
  category_items = [];
  id:string;
  cat_id: string;
  name:string;
  icon:string;
  brand:string;
  date:string;
  shade:string;
  favourite:boolean;
  quantity:number;
  note:string;
  constructor(private route:ActivatedRoute, private router:Router, private modalController:ModalController, private itemService:ItemService) { }
  
  //get the items from storage using the items service
  //using the cat_id, passed from the previous page, get the category items
  async ngOnInit() {
    this.items = await this.itemService.getItems();
    this.cat_id = this.route.snapshot.paramMap.get('i');
    this.category_items = await this.itemService.getCatItems(this.cat_id);
  }

  //show the details of the selected item
  async showItem(i: number){
    const modal = await this.modalController.create({
      component: ShowItemPage,
      componentProps: {
        cat_id: this.category_items[i].cat_id,
        name: this.category_items[i].name,
        icon: this.category_items[i].icon,
        brand: this.category_items[i].brand,
        date: this.category_items[i].date,
        shade: this.category_items[i].shade,
        favourite: this.category_items[i].favourite,
        quantity: this.category_items[i].quantity,
        note: this.category_items[i].note
      }
    });
    modal.onDidDismiss().then((retval)=>{});
    return modal.present();
  }

  //create and present the add item modal page
  async addItem(i: string){
    const modal = await this.modalController.create({
      component: AddItemPage});
    //if the value for an attribute is null then a default value is used 
    //else the new value passed from the modal is used
    modal.onDidDismiss().then((retval)=>{
      if (retval.data != undefined){
        //id
        this.id = "i" + String(this.items.length);
        //cat_id
        this.cat_id = i;
        //name
        if (retval.data.name == null){
          this.name = "New Item";
        } else {
          this.name = retval.data.name;
        }
        //icon
        if (retval.data.icon == null){
          this.icon = "blank.png";
        } else {
          this.icon = retval.data.icon;
        }
        //brand
        if (retval.data.brand == null){
          this.brand = "No Brand";
        } else {
          this.brand = retval.data.brand;
        }
        //date
        if (retval.data.date == null){
          this.date = "2000-01-01";
        } else {
          this.date = retval.data.date;
        }
        //shade
        if (retval.data.shade == null){
          this.shade = "No shade";
        } else {
          this.shade = retval.data.shade;
        }
        //favourite
          if (retval.data.favourite == null){
            this.favourite = false
          } else{
            this.favourite = retval.data.favourite
          }
        //quantity
        if (retval.data.quantity == null){
          this.quantity = 0;
        } else {
          this.quantity = retval.data.quantity;
        }
        //note
        if (retval.data.note == null){
          this.note = "No Note";
        } else {
          this.note = retval.data.note;
        }
        //update the category and items arrays with the new data
        this.category_items.push({id: this.id, cat_id: this.cat_id, name: this.name, icon: this.icon, brand: this.brand, date: this.date, shade: this.shade, favourite: this.favourite, quantity: this.quantity, note: this.note});
        this.items.push({id: this.id, cat_id: this.cat_id, name: this.name, icon: this.icon, brand: this.brand, date: this.date, shade: this.shade, favourite: this.favourite, quantity: this.quantity, note: this.note});
        //save the data using the service
        this.itemService.setItems(this.items);
      }
    });
    return modal.present();
  }

  //delete the selected item from the category_items and items arrays
  deleteItem(item_id: string, i:number){
    //iterate through the category array and find which index holds the same id as item_id
    if (confirm("Delete item " + this.category_items[i].name + "?")){
      //update the category_items array
      this.category_items.splice(i, 1);
      //iterate through the items array and find which index holds the same as item_id
      for (let index=0; index < this.items.length; index++){
        if (item_id == this.items[index].id){
          //update the items array
          this.items.splice(index, 1);
          //update storage
          this.itemService.setItems(this.items);
        }
      }
    }
    
  }
  
  //create the edit item modal page with the relevent data and present to modal
  async editItem(item_id:string, i: number){
    const modal = await this.modalController.create({
      component: EditItemPage,
      componentProps: {
        id: this.category_items[i].id,
        cat_id: this.category_items[i].cat_id,
        name: this.category_items[i].name,
        icon_path: this.category_items[i].icon_path,
        icon: this.category_items[i].icon,
        brand: this.category_items[i].brand,
        date: this.category_items[i].date,
        shade: this.category_items[i].shade,
        favourite: this.category_items[i].favourite,
        quantity: this.category_items[i].quantity,
        note: this.category_items[i].note
      }
    });
    //if the value for an attribute is null then the old value is used 
    //else the new value passed from the modal is used
    modal.onDidDismiss().then((retval)=>{
      if (retval.data != undefined){
        //id
        this.id = this.category_items[i].id
        //cat_id
        this.cat_id = this.category_items[i].cat_id
        //name
        if (retval.data.name == ""){
          this.name = this.category_items[i].name;
        } else {
          this.name = retval.data.name;
        }
        //icon
        if (retval.data.icon == ""){
          this.icon = this.category_items[i].icon;
        } else {
          this.icon = retval.data.icon;
        }
        //brand
        if (retval.data.brand == ""){
          this.brand = "No Brand";
        } else {
          this.brand = retval.data.brand;
        }
        //date
        if (retval.data.date == null){
          this.date = this.category_items[i].date;
        } else {
          this.date = retval.data.date;
        }
        //shade
        if (retval.data.shade == ""){
          this.shade = "No shade";
        } else {
          this.shade = retval.data.shade;
        }
        //favourite
        if (retval.data.favourite == null){
          this.favourite = this.category_items[i].favourite;
        } else {
          this.favourite = retval.data.favourite;
        }
        //quantity
        if (retval.data.quanitiy == ""){
          this.quantity = this.category_items[i].quantity;
        } else {
          this.quantity = retval.data.quantity;
        }
        //note
        this.note = retval.data.note;
        this.category_items[i] = {id: this.id, cat_id: this.cat_id, name: this.name, icon: this.icon, brand: this.brand, date: this.date, shade: this.shade, favourite: this.favourite, quantity: this.quantity, note: this.note};
        for(let index=0; index<this.items.length; index++){
          if(this.id == this.items[index].id){
            this.items[index] = {id: this.id, cat_id: this.cat_id, name: this.name, icon: this.icon, brand: this.brand, date: this.date, shade: this.shade, favourite: this.favourite, quantity: this.quantity, note: this.note}; 
          }
        }
      }
    });
    return modal.present();
  }
}