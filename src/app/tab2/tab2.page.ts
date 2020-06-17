import { Component, ɵConsole } from '@angular/core';
import { ItemService } from '../item.service';
import { CategoryService } from '../category.service';
import { Chart } from 'chart.js';
import { NgModule, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  //define some static variables to configure the chart 
  chart: any;
  @ViewChild("chart", {static: false}) canvas;
  dataset = [];
  dataLabels = [];
  alpha = 0.7;
  backgroundcolors = [
    "rgba(208,137,205, " + String(this.alpha) + ")",
    "rgba(122,48,135, " + String(this.alpha) + ")",
    "rgba(145,72,161, " + String(this.alpha) + ")",
    "rgba(147,157,152, " + String(this.alpha) + ")",
    "rgba(204,187,223, " + String(this.alpha) + ")",
    "rgba(110,65,106, " + String(this.alpha) + ")",
    "rgba(81,101,89, " + String(this.alpha) + ")",
    "rgba(147,157,152, " + String(this.alpha) + ")",
    "rgba(103,79,125, " + String(this.alpha) + ")",
    "rgba(156,104,151, " + String(this.alpha) + ")"
  ];
  chartconfig = {
    type: 'doughnut',
    data: {
      labels: this.dataLabels,
      datasets: [{
        label: this.dataLabels,
        data: this.dataset,
        backgroundColor: this.backgroundcolors
      }],
      options: {
        legend: {
          display: true,
          position: top
        }
      }
    }
  };
  items = [];
  categories = [];
  constructor(private itemService:ItemService, private categoryService:CategoryService) { }
  async ngOnInit() {}
  async ionViewDidEnter(){
    //get the items from storage
    this.items = await this.itemService.getItems();
    //count the number of items in each category
    var itemCount = this.countItems();
    //calculate the percentage of items each category holds within the entire collection
    var dataDict = this.percentage(itemCount);
    //create an array of labels based on the keys in dataDict
    var rawDataLabels = this.splitDict(dataDict);
    //get the categories from storage
    this.categories = await this.categoryService.getCategories();
    //change the labels from the cat_id into the category name
    this.refactorLabels(rawDataLabels);
    //create the chart
    this.chart = new Chart(this.canvas.nativeElement, this.chartconfig);
  }
  //when leaving the page, reset the dataset and dataLabels to an empty array
  ionViewDidLeave(){
    this.dataset = [];
    this.dataLabels = [];
  }
  //count the number of items in each category
  //returns a dictionary in the form of: itemCount[cat_id] = count
  countItems(){
    var itemCount = {};
    for(let i=0; i<this.items.length; i++){
      var cat_id = this.items[i].cat_id;
      if(itemCount[cat_id] == null){
        itemCount[cat_id] = this.items[i].quantity;
      } else {
        itemCount[cat_id] += this.items[i].quantity;
      }
    }
    return itemCount;
  }
  //calculate the percentage of items each category holds within the entire collection
  //returns a dictionary in the form of: itemCount[cat_id] = percentage
  percentage(itemCount){
    var total = 0;
    for(let key in itemCount){
      total += itemCount[key];
    }
    console.log(itemCount);
    console.log(total);
    for(let key in itemCount){
      itemCount[key] = (itemCount[key]/total) * 100
    }
    return itemCount;
  }
  //using the keys (cat_id) in dataDict, create an array of raw data labels
  //returns an array in the form: [cat_id_1, cat_id_2,...]
  splitDict(dataDict){
    var rawDataLabels = [];
    for(let key in dataDict){
      rawDataLabels.push(key);
      this.dataset.push(dataDict[key]);
    }
    return rawDataLabels;
  }
  //change the data labels from the category id into the category name
  //returns an array in the form: ['name_1', 'name_2',...]
  async refactorLabels(rawDataLabels){
    for(let i=0; i<rawDataLabels.length; i++){
      for(let j=0; j<this.categories.length; j++){
        if(rawDataLabels[i] == this.categories[j].id){
          this.dataLabels[i] = this.categories[j].name;
        }
      }
    }
  }
  //update the chart
  updateChart(){
    this.addBackgroundColor();
    this.chart.data.datasets[0].data = this.dataset;
    this.chart.data.labels = this.dataLabels;
    this.chart.update();
  }
  //selects a random colour from the backgroundcolors array and appends it to the end of the array
  addBackgroundColor(){
    if(this.dataset.length >= this.backgroundcolors.length){
      let index = Math.floor(Math.random() * 11);
      var color = this.backgroundcolors[index];
      this.backgroundcolors.push(color);
    }
  }
}
