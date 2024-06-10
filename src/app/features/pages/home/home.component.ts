import { Component } from "@angular/core";
import { BookkeepingitemComponent } from "../../components/bookkeepingitem/bookkeepingitem.component";
import { MatButton } from "@angular/material/button";
@Component({
    selector: "app-home",
    standalone: true,
    imports: [ BookkeepingitemComponent, MatButton ],
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
})
export class HomeComponent{

}