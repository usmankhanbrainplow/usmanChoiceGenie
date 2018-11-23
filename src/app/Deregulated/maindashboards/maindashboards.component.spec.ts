import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaindashboardsComponent } from './maindashboards.component';

describe('MaindashboardsComponent', () => {
  let component: MaindashboardsComponent;
  let fixture: ComponentFixture<MaindashboardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaindashboardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaindashboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
