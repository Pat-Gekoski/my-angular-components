import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayComponentsComponent } from './display-components.component';

describe('DisplayComponentsComponent', () => {
  let component: DisplayComponentsComponent;
  let fixture: ComponentFixture<DisplayComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayComponentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
