import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountdetailcardComponent } from './accountdetailcard.component';

describe('AccountdetailcardComponent', () => {
  let component: AccountdetailcardComponent;
  let fixture: ComponentFixture<AccountdetailcardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountdetailcardComponent]
    });
    fixture = TestBed.createComponent(AccountdetailcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
