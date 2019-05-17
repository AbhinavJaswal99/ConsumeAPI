import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderInformationComponent } from './order-information.component';

describe('OrderInformationComponent', () => {
  let component: OrderInformationComponent;
  let fixture: ComponentFixture<OrderInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
