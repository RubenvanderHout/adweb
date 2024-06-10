import { Component } from "@angular/core";
import { BookkeepingitemComponent } from "../../components/bookkeepingitem/bookkeepingitem.component";

@Component({
    selector: "app-home",
    standalone: true,
    imports: [ BookkeepingitemComponent ],
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
})
export class HomeComponent{

}