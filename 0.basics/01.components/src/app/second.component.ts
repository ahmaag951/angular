import { Component } from "@angular/core";

@Component({
    selector: 'Second',
    templateUrl: './second.component.html',
    standalone: false
})
export class SecondComponent{
    helloMessage = 'I am a simple hello message.'
}