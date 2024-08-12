import { Component, OnInit, inject } from "@angular/core";
import { BookkeepingitemComponent } from "../../components/bookkeepingitem/bookkeepingitem.component";
import { MatButton } from "@angular/material/button";
import { BookkeepingService } from "../../services/bookkeeping.service";
import { Observable } from "rxjs";
import { Bookkeeping } from '../../models/bookkeeping.model'
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup } from "@angular/forms";
@Component({
    selector: "app-home",
    standalone: true,
    imports: [ BookkeepingitemComponent, MatButton,CommonModule ],
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit{
    collection: Bookkeeping[] = [];
    bookkeepingService:BookkeepingService = inject(BookkeepingService);
    constructor(private fb: FormBuilder){
        
    }
    
    addBookkeeping(){
        this.bookkeepingService.createBookkeeping("Boek","Vakanties")
    }
    ngOnInit(): void {
        this.bookkeepingService.getBookkeepings().subscribe(data => {
            this.collection = data;
        })
    }
    
}