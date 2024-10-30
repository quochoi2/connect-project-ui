import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryActionViewComponent } from './history-action-view.component';

describe('HistoryActionViewComponent', () => {
  let component: HistoryActionViewComponent;
  let fixture: ComponentFixture<HistoryActionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryActionViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryActionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
