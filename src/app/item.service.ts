import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IconService } from './icon.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private storage:Storage, private iconService:IconService) { }
  items = [];
  //get the items from storage, if there is nothing in storage (items == null) then set items to an array of item objects
  async getItems(){
    this.items = await this.storage.get("items");
    if (this.items == null) {
      this.items = [
      {id: 'i0', cat_id: 'c0', name: "Infaillible 24Hr Fresh Wear", icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABn0lEQVRoge2YvUoDQRSFv0iEaGsRfAALQYuUpouF76KP4CvYCL5AnsAHsFCS+BMULAIRK21Ei2AhipWgxd4lJmx+duauOyv3g+FCZubknN3ZGZgSupwCNaAv7QY4B+6V/ydzvie0F+AIqAOl3NyloEdkvA3sA8fAK6OhznJzl4I68CVtS34rAw3gkGGYQnBAZLaX0FeoIBUmGy5UkAtmB+n8qSNHYrPthL4OBXors4xmEmRBUeuEUYOTzpTf/WpLTPNwcn3KKh7KGiJjzGtMdXlpLq1csSChYUEYbrdJ2+o8LWm883bss/VldTo7edLYfrXOIq8HY99IaFiQ0LAgoWFBQsOChIYFCQ0LEhoWJDQsSGhYEOBT6pKCj2WpH64CPkEGUlc8NGJijcHUUVPwCfIgdcNDI2ZT6qOrgE+QltSGh0ZMrNGaOiojakR3UU/43Y8tAs+iVVPw5cSVGNj10NgTjUsVR45si4l3YN1h/hrwJho7ir6caBIZ6QPVFPOqwJ3Mbaq7cqACXDP/Lfx4u2V4juTOKtAlfYiuzDX+HT8BtYidLCl8CAAAAABJRU5ErkJggg==", brand: "Loreal Paris", date: "2019-10-21", shade: "130 True Beige", favourite: true, quantity: 2, note: "Favourite everyday foundation, slightly too dark"},
      {id: 'i1', cat_id: 'c0', name: "Born This Way", icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABn0lEQVRoge2YvUoDQRSFv0iEaGsRfAALQYuUpouF76KP4CvYCL5AnsAHsFCS+BMULAIRK21Ei2AhipWgxd4lJmx+duauOyv3g+FCZubknN3ZGZgSupwCNaAv7QY4B+6V/ydzvie0F+AIqAOl3NyloEdkvA3sA8fAK6OhznJzl4I68CVtS34rAw3gkGGYQnBAZLaX0FeoIBUmGy5UkAtmB+n8qSNHYrPthL4OBXors4xmEmRBUeuEUYOTzpTf/WpLTPNwcn3KKh7KGiJjzGtMdXlpLq1csSChYUEYbrdJ2+o8LWm883bss/VldTo7edLYfrXOIq8HY99IaFiQ0LAgoWFBQsOChIYFCQ0LEhoWJDQsSGhYEOBT6pKCj2WpH64CPkEGUlc8NGJijcHUUVPwCfIgdcNDI2ZT6qOrgE+QltSGh0ZMrNGaOiojakR3UU/43Y8tAs+iVVPw5cSVGNj10NgTjUsVR45si4l3YN1h/hrwJho7ir6caBIZ6QPVFPOqwJ3Mbaq7cqACXDP/Lfx4u2V4juTOKtAlfYiuzDX+HT8BtYidLCl8CAAAAABJRU5ErkJggg==", brand: "Too Faced", date: "2019-12-25", shade: "Cloud", favourite: false, quantity: 1, note: "High coverage, slightly too pale"},
      {id: 'i2', cat_id: 'c0', name: "Fit ME", icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABn0lEQVRoge2YvUoDQRSFv0iEaGsRfAALQYuUpouF76KP4CvYCL5AnsAHsFCS+BMULAIRK21Ei2AhipWgxd4lJmx+duauOyv3g+FCZubknN3ZGZgSupwCNaAv7QY4B+6V/ydzvie0F+AIqAOl3NyloEdkvA3sA8fAK6OhznJzl4I68CVtS34rAw3gkGGYQnBAZLaX0FeoIBUmGy5UkAtmB+n8qSNHYrPthL4OBXors4xmEmRBUeuEUYOTzpTf/WpLTPNwcn3KKh7KGiJjzGtMdXlpLq1csSChYUEYbrdJ2+o8LWm883bss/VldTo7edLYfrXOIq8HY99IaFiQ0LAgoWFBQsOChIYFCQ0LEhoWJDQsSGhYEOBT6pKCj2WpH64CPkEGUlc8NGJijcHUUVPwCfIgdcNDI2ZT6qOrgE+QltSGh0ZMrNGaOiojakR3UU/43Y8tAs+iVVPw5cSVGNj10NgTjUsVR45si4l3YN1h/hrwJho7ir6caBIZ6QPVFPOqwJ3Mbaq7cqACXDP/Lfx4u2V4juTOKtAlfYiuzDX+HT8BtYidLCl8CAAAAABJRU5ErkJggg==", brand: "Maybelline", date: "2019-10-02", shade: "210 Sandy Beige", favourite: true, quantity: 2, note: "Perfect foundation to match fake tan"},
      {id: 'i3', cat_id: 'c1', name: "Love Flush", icon: "data:image/png;base64,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", brand: "Too Faced", date: "2020-02-13", shade: "I Will Always Love You", favourite: true, quantity: 1, note:"Peachy Pink"}
      ];
      this.storage.set("items", this.items);
    }
    return this.items;
  }
  //iterate through the items array and get the category items based on the category id
  //return the category items
  async getCatItems(cat_id:string){
    var category_items = [];
    for(let i=0; i<this.items.length; i++){
      if(this.items[i].cat_id == cat_id){
        category_items.push(this.items[i]);
      }
    }
    return category_items;
  }
  //set the value of items in storage to the newItems array
  setItems(newItems){
    this.storage.set('items', newItems);
  }
  //delete the items based on the category id passed into the function
  //update storage 
  deleteCatItems(cat_id: string){
    for(let i=0; i<this.items.length; i++){
      if(this.items[i].cat_id == cat_id){
        this.items.splice(i, 1);
      }
    }
    this.setItems(this.items);
  }
}
