import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesComparisonComponent } from './features-comparison.component';

describe('FeaturesComparisonComponent', () => {
  let component: FeaturesComparisonComponent;
  let fixture: ComponentFixture<FeaturesComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturesComparisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturesComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
