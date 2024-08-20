import { Component, computed, EventEmitter, HostListener, Input, OnInit, Output, signal } from "@angular/core";
import { BookkeepingitemComponent } from "../bookkeepingitem/bookkeepingitem.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { Bookkeeping } from '../../models/bookkeeping.model'
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field"
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { Router } from "@angular/router";

@Component({
    selector: "app-list",
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.css"],
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
    ],
    standalone: true,
})
export class ListComponent implements OnInit {

    @Input() collection: Bookkeeping[] = [];
    @Output() editToggle = new EventEmitter<Bookkeeping>();
    @Output() archiveCard = new EventEmitter<string>();

    private currentEditingId = signal<string | null>(null);
    gridCols: number = 3;

    isEditing = computed(() => {
        return (bookkeeping: Bookkeeping) => this.currentEditingId() === bookkeeping.id;
    });

    constructor(private router : Router) { }

    ngOnInit(): void {
        this.updateGridCols(window.innerWidth);
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

    toggleEdit(bookkeeping: Bookkeeping) {
        this.currentEditingId.set(this.currentEditingId() === bookkeeping.id ? null : bookkeeping.id);
        this.editToggle.emit(bookkeeping);
    }


    archive(bookkeeping: string) {
        this.archiveCard.emit(bookkeeping);
    }

    navigateToBookkeeping(cardname: string) {
        this.router.navigate(["/bookkeepings/", `${cardname}`]);
    }

}