import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular';
import { EventData } from 'tns-core-modules/ui/page/page';
import * as utils from 'tns-core-modules/utils/utils';
import { ImageSource, fromUrl } from 'tns-core-modules/image-source/image-source';
import { GestureTypes, PanGestureEventData, PinchGestureEventData } from "tns-core-modules/ui/gestures/gestures";
import { Image } from 'tns-core-modules/ui/image/image';
import { AnimationCurve } from 'tns-core-modules/ui/enums/enums';
import { ScrollView } from 'tns-core-modules/ui/scroll-view/scroll-view';


@Component({
    moduleId: module.id,
    selector: 'largeimage',
    templateUrl: './largeimage.component.html'
})
export class LargeImageComponent implements OnInit {
    constructor(private mParams: ModalDialogParams) {
        this.img = this.mParams.context.img;
    }

    @ViewChild("dragImage", { static: true }) dragImage: ElementRef;
    @ViewChild("imgScroll", { static: true }) imgScroll: ElementRef;
    dragImageItem: Image;
    imageScroller: ScrollView;
    prevX: number;
    prevY: number;
    imageDimension: {};
    imgSize;
    orientation;
    img: string;
    imageWidth;
    imageHeight;
    originalImage: string;

    ngOnInit(): void {
        this.originalImage = this.mParams.context.img;
        console.log("In image modal: ", this.img);
        this.dragImageItem = <Image>this.dragImage.nativeElement;
        this.imageScroller = <ScrollView>this.imgScroll.nativeElement;
    }

    onModalLoaded(args: EventData) {
        let obj = args.object;
        const imgHeightRegex = /&ImageHeight=(\d+)/;
        const imgWidthRegex = /ImageWidth=(\d+)/;
        let imageHeightResult = imgHeightRegex.exec(this.img);
        this.imageHeight = imageHeightResult[1];

        let imageWidthResult = imgWidthRegex.exec(this.img);
        this.imageWidth = imageWidthResult[1];
        console.log("In ModalLoaded: ", this.imageWidth, this.imageHeight);
    }

    onImageLoaded(args: EventData){
        console.log("On Image loaded");
        let dragImage = <Image>args.object;
        // console.log(dragImage.getActualSize());
        // console.log(utils.layout.toDevicePixels(dragImage.getActualSize().height));
        if(dragImage){
            setTimeout(()=>{
                this.imgSize = dragImage.getActualSize();
                if(this.imgSize.width>this.imgSize.height){
                    this.orientation = "horizontal";
                    this.imageScroller.scrollToHorizontalOffset(this.imgSize.width / 4, true);

                } else {
                    this.orientation = "vertical";
                    this.imageScroller.scrollToVerticalOffset(this.imgSize.width / 4, true);
                }
                console.log("Image Size: ", this.imgSize);
            },1500);
        }   
    }

    onPinch(args: PinchGestureEventData) {
        console.log("Pinch scale: " + args.scale + " state: " + args.state);
        if (this.imgSize) {
            if (args.state === 1) { 
                var newOriginX = args.getFocusX() - this.dragImageItem.translateX;
                var newOriginY = args.getFocusY() - this.dragImageItem.translateY;

                console.log(this.dragImageItem.scaleX, this.dragImageItem.scaleY);
            }
        }

    }

    closeModal() {
        this.mParams.closeCallback(this.img);
    }
}
