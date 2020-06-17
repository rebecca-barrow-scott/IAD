import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShowItemPage } from './show-item.page';

describe('ShowItemPage', () => {
  let component: ShowItemPage;
  let fixture: ComponentFixture<ShowItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowItemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
