import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyChocieGenieComponent } from './why-chocie-genie.component';

describe('WhyChocieGenieComponent', () => {
  let component: WhyChocieGenieComponent;
  let fixture: ComponentFixture<WhyChocieGenieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhyChocieGenieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyChocieGenieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
