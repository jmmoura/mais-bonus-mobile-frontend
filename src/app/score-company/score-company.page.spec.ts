import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScoreCompanyPage } from './score-company.page';

describe('ScoreCompanyPage', () => {
  let component: ScoreCompanyPage;
  let fixture: ComponentFixture<ScoreCompanyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ScoreCompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
