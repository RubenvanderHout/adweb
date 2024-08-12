import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Bookkeeping } from '../../models/bookkeeping.model';
@Component({
  selector: 'app-bookkeepingitem',
  standalone: true,
  imports: [ MatCardModule, MatButtonModule ],
  templateUrl: './bookkeepingitem.component.html',
  styleUrl: './bookkeepingitem.component.css'
})
export class BookkeepingitemComponent {
  @Input() bookkeeping!:Bookkeeping;
  archive() {
    throw new Error('Method not implemented.');
  }
  navigateToBookkeeping() {
    throw new Error('Method not implemented.');
  }

}
