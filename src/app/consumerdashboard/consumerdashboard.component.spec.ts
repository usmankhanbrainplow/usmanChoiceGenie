import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerdashboardComponent } from './consumerdashboard.component';

describe('ConsumerdashboardComponent', () => {
  let component: ConsumerdashboardComponent;
  let fixture: ComponentFixture<ConsumerdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
