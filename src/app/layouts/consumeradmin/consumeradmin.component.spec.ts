import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumeradminComponent } from './consumeradmin.component';

describe('ConsumeradminComponent', () => {
  let component: ConsumeradminComponent;
  let fixture: ComponentFixture<ConsumeradminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumeradminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumeradminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
