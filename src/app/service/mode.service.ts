import { Injectable, ViewContainerRef, Type } from "@angular/core";
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular';
import { LargeImageComponent } from "../model/largeimage.component";

@Injectable()
export class ModalService {
    private modalIsShowing = false;
    constructor(private modalService: ModalDialogService) { }

    public createModalContext<T, R>(vcRef: ViewContainerRef,title: string,payload: T,defaultResult: R = null,btnOkText: string = 'Done',
    btnCancelText: string = 'Cancel'): MyModalContext<T, R> {
        return {
            vcRef,
            title,
            payload,
            defaultResult,
            btnOkText,
            btnCancelText
        };
    }

    public createModal<T,R>(
        type: Type<any>,
        context: MyModalContext<T ,R> 
        ): Promise<R> {
        if(this.modalIsShowing){
            return Promise.reject<R>('A modal is already showing')
        }
        
        return new Promise((resolve, reject) => {
            const options: ModalDialogOptions = {
                fullscreen: true,
                context: context,
                viewContainerRef: context.vcRef
            };
            this.modalIsShowing = true;
            this.modalService.showModal(type, options)
            .then((result) => {
                resolve(result);
                this.modalIsShowing = false;
            })
            .catch((err)=> {
                reject(err);
                this.modalIsShowing = false;
        })
        });
    }
}



export interface MyModalContext<T, R> {
    vcRef: ViewContainerRef;
    title: string;
    payload: T;
    defaultResult: R;
    btnOkText: string;
    btnCancelText: string;
}


@Injectable()
export class FullScreenService {

    constructor(private modalService: ModalDialogService) { }

    popModalImage(options) {
        this.modalService.showModal(LargeImageComponent, options)
            .then(res => {
                console.log(res);
            });
    }

}
