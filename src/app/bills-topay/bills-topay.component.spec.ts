import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsTopayComponent } from './bills-topay.component';

describe('BillsTopayComponent', () => {
  let component: BillsTopayComponent;
  let fixture: ComponentFixture<BillsTopayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillsTopayComponent]
    });
    fixture = TestBed.createComponent(BillsTopayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
