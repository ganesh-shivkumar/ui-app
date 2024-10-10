import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversionSectionComponent } from './conversion-section.component';

describe('ConversionSectionComponent', () => {
  let component: ConversionSectionComponent;
  let fixture: ComponentFixture<ConversionSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversionSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
