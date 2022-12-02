import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailHeroesComponent } from './detail-heroes.component';

describe('DetailHeroesComponent', () => {
  let component: DetailHeroesComponent;
  let fixture: ComponentFixture<DetailHeroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailHeroesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
