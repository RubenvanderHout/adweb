import { Component, HostListener, OnInit, inject } from "@angular/core";
import { BookkeepingitemComponent } from "../../components/bookkeepingitem/bookkeepingitem.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { BookkeepingService } from "../../services/bookkeeping.service";
import { Bookkeeping } from '../../models/bookkeeping.model'
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field"
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { ListComponent } from "../../components/listComponent/list.component";

@Component({
    selector: "app-bookkeeping-list",
    templateUrl: "./bookKeepingList.component.html",
    styleUrls: ["./bookKeepingList.component.css"],
    imports: [
    BookkeepingitemComponent,
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ListComponent
],
    standalone: true,
})
export class BookKeepingListComponent implements OnInit {
    public collection: Bookkeeping[] = [];
    bookService: BookkeepingService = inject(BookkeepingService);

    newCard: Bookkeeping = { id: '', name: '', description: '', archived: false }
    gridCols: number = 3;

    addBookkeepingError: string = '';

    ngOnInit(): void {
        this.updateGridCols(window.innerWidth);

        this.bookService.getBookkeepings().subscribe(data => {
            this.collection = data;
        })
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.updateGridCols(event.target.innerWidth);
    }

    updateGridCols(width: number) {
        if (width <= 600) {
            this.gridCols = 1;
        } else if (width <= 960) {
            this.gridCols = 2;
        } else {
            this.gridCols = 3;
        }
    }

    addBookkeeping() {
        this.addBookkeepingError = '';

        const NameNotSet = this.newCard.name.trim() === '';

        if (NameNotSet) {
            this.addBookkeepingError = 'Name is required';
            return;
        }

        this.bookService.createBookkeeping(this.newCard.name, this.newCard.description);
    }

    archive(cardName: string) {
        this.bookService.archive(cardName);
    }

    toggleEdit(card: any) {
        card.isEditing = !card.isEditing;
    }
}