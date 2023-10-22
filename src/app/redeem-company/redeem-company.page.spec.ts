import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RedeemCompanyPage } from './redeem-company.page';

describe('RedeemCompanyPage', () => {
  let component: RedeemCompanyPage;
  let fixture: ComponentFixture<RedeemCompanyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RedeemCompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
