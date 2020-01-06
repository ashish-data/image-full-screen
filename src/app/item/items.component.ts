import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { PageChangeEventData } from "nativescript-image-swipe";
import { ModalDialogOptions } from "nativescript-angular";
import { FullScreenService } from "../service/mode.service";




@Component({
    selector: "ns-items",
    templateUrl: "./items.component.html"
})
export class ItemsComponent implements OnInit {

    ngOnInit(): void {}

    constructor(public vcRef: ViewContainerRef, public fullscreen: FullScreenService){ }


    modalImage(args) {

        let imageContext = {
            img: args.object.src
        }
        const options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: imageContext,
            fullscreen: true
        }
         this.fullscreen.popModalImage(options);
    }
}