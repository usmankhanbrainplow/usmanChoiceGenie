import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceandsavingComponent } from './choiceandsaving.component';

describe('ChoiceandsavingComponent', () => {
  let component: ChoiceandsavingComponent;
  let fixture: ComponentFixture<ChoiceandsavingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoiceandsavingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceandsavingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
