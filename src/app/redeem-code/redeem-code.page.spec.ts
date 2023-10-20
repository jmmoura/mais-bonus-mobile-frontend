import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RedeemCodePage } from './redeem-code.page';

describe('RedeemCodePage', () => {
  let component: RedeemCodePage;
  let fixture: ComponentFixture<RedeemCodePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RedeemCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
