import { Component, inject } from '@angular/core';
import { Bookkeeping } from '../../models/bookkeeping.model';
import { BookkeepingService } from '../../services/bookkeeping.service';
import { ListComponent } from "../../components/listComponent/list.component";

@Component({
  selector: 'app-archived',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './archived.component.html',
  styleUrl: './archived.component.css'
})
export class ArchivedComponent {
  public collection: Bookkeeping[] = [];
  bookkeepingService: BookkeepingService = inject(BookkeepingService);

  ngOnInit(): void {
    this.bookkeepingService.getArchivedBookkeepings().subscribe(data => {
      this.collection = data;
    })
  }

}
