import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookkeepingitemComponent } from './bookkeepingitem.component';

describe('BookkeepingitemComponent', () => {
  let component: BookkeepingitemComponent;
  let fixture: ComponentFixture<BookkeepingitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookkeepingitemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookkeepingitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
