import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MybillsComponent } from './mybills.component';

describe('MybillsComponent', () => {
  let component: MybillsComponent;
  let fixture: ComponentFixture<MybillsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MybillsComponent]
    });
    fixture = TestBed.createComponent(MybillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
