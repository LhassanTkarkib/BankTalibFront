import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsBoardComponent } from './bills-board.component';

describe('BillsBoardComponent', () => {
  let component: BillsBoardComponent;
  let fixture: ComponentFixture<BillsBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillsBoardComponent]
    });
    fixture = TestBed.createComponent(BillsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
