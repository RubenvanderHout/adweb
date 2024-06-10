import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-bookkeepingitem',
  standalone: true,
  imports: [ MatCardModule, MatButtonModule ],
  templateUrl: './bookkeepingitem.component.html',
  styleUrl: './bookkeepingitem.component.css'
})
export class BookkeepingitemComponent {

  archive() {
    throw new Error('Method not implemented.');
  }
  navigateToBookkeeping() {
    throw new Error('Method not implemented.');
  }

}
