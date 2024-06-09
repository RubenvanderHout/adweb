import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookkeepingoverviewComponent } from './bookkeepingoverview.component';

describe('BookkeepingoverviewComponent', () => {
  let component: BookkeepingoverviewComponent;
  let fixture: ComponentFixture<BookkeepingoverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookkeepingoverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookkeepingoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
