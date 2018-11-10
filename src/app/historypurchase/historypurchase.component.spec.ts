import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorypurchaseComponent } from './historypurchase.component';

describe('HistorypurchaseComponent', () => {
  let component: HistorypurchaseComponent;
  let fixture: ComponentFixture<HistorypurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorypurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorypurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
