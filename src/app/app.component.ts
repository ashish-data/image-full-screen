import { Component } from "@angular/core";

import { registerElement } from 'nativescript-angular/element-registry';
registerElement('ImageZoom', () => require('nativescript-image-zoom').ImageZoom);

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent { }
