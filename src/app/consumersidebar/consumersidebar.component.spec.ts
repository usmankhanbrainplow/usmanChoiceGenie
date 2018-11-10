import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumersidebarComponent } from './consumersidebar.component';

describe('ConsumersidebarComponent', () => {
  let component: ConsumersidebarComponent;
  let fixture: ComponentFixture<ConsumersidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumersidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumersidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
