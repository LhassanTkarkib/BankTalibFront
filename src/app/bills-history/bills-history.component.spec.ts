import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsHistoryComponent } from './bills-history.component';

describe('BillsHistoryComponent', () => {
  let component: BillsHistoryComponent;
  let fixture: ComponentFixture<BillsHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillsHistoryComponent]
    });
    fixture = TestBed.createComponent(BillsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
