import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SphereComponent } from './sphere.component';

describe('SphereComponent', () => {
  let component: SphereComponent;
  let fixture: ComponentFixture<SphereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SphereComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SphereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
