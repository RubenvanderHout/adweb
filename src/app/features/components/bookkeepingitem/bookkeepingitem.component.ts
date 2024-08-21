import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Bookkeeping } from '../../models/bookkeeping.model';
import { BookkeepingService } from '../../services/bookkeeping.service';
@Component({
  selector: 'app-bookkeepingitem',
  standalone: true,
  imports: [ MatCardModule, MatButtonModule ],
  templateUrl: './bookkeepingitem.component.html',
  styleUrl: './bookkeepingitem.component.css'
})
export class BookkeepingitemComponent {
  @Input() bookkeeping! : Bookkeeping;

  constructor(private bookservice : BookkeepingService){

  }




  archive() {
    this.bookservice.archive(this.bookkeeping.name)
  }
  navigateToBookkeeping() {
    throw new Error('Method not implemented.');
  }

}
