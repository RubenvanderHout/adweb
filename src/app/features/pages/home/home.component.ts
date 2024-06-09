import { Component } from "@angular/core";
import { LoginComponent } from "../../components/login/login.component";

@Component({
    selector: "app-home-page",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
    imports: [
        LoginComponent
    ],
    standalone: true,
})
export default class HomeComponent{

}