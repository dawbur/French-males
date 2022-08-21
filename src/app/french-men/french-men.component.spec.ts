import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrenchMenComponent } from './french-men.component';

describe('FrenchMenComponent', () => {
  let component: FrenchMenComponent;
  let fixture: ComponentFixture<FrenchMenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrenchMenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrenchMenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
