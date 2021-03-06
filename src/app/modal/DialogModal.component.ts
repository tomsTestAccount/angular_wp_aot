import {Component,OnInit,DoCheck,AfterViewInit } from '@angular/core';
import {MdDialogRef} from '@angular/material';
import { Subject }    from 'rxjs/Subject';

//TODO: think aboout , if it's really neccessary to import the whole REST-Service
import {RestService} from '../_services/rt-rest.service';


export interface IDialogStruct {
    title?: string;
    message?: Array<string>;
    dialogSelection: string;
    href?:string;
    progressBarMode?:string;
}

const dbg_print = false;

@Component({
    selector: 'my-uaFormDialog',
    template: `
            <div *ngIf="ds.dialogSelection == 'loading'"  id="loadingDialog">
                
                <div  *ngIf="ds.progressBarMode === undefined" id="spinnerDiv" [style.display]="'flex'" [style.justify-content]="'center'" >
                    <md-spinner></md-spinner>
                </div>
                
                <div  *ngIf="ds.progressBarMode !== undefined" id="prgressBarDiv" [style.display]="'flex'" [style.justify-content]="'center'" >
                    <md-progress-bar color="accent" mode="{{ds.progressBar_mode}}" value="{{evt_progressBar_value}}"></md-progress-bar>
                </div>
                <p *ngIf="ds.progressBarMode !== undefined" class="loadingProgress_value">{{evt_progressBar_value}}%</p>
                
                <p>{{ ds.title | translate }}</p>
                <p>{{ ds.message }}</p>
            </div>    
            
            <div *ngIf="ds.dialogSelection == 'confirm'"  id="confirmDialog">
                <p>{{ ds.title | translate}}</p>
                <p>{{ ds.message }}</p>
                <button type="button" md-raised-button 
                    (click)="dialogRef.close(true)">OK</button>
                <button type="button" md-button 
                    (click)="dialogRef.close()">Cancel</button>
            </div>

            <div *ngIf="ds.dialogSelection == 'href_confirm'"  id="confirmDialog">
                <p class="subTitle">{{ ds.title | translate}}</p>
                <p *ngFor="let str of ds.message">{{ str | translate }}</p>
                <a class="btn bs_submit_button"
                        href="{{summaryPage_href}}">{{ 'iAmSure' | translate}} </a>
                <button class="btn bs_submit_button"
                        (click)="dialogRef.close('save')">{{ 'save' | translate}}</button>
                <button class="btn bs_submit_button"
                        (click)="dialogRef.close()">{{ 'cancel' | translate}}</button>
            </div>
            
            
            <div *ngIf="ds.dialogSelection == 'info'"  id="infoDialog">
                <p>{{ ds.title }}</p>
                <p>{{ ds.message }}</p>
                <button type="button" md-raised-button 
                    (click)="dialogRef.close(true)">OK</button>
                <!--<button type="button" md-button 
                    (click)="dialogRef.close()">Cancel</button>
                 -->
            </div>

            <div *ngIf="ds.dialogSelection == 'warning'"  id="warnDialog">
                <p>{{ ds.title }}</p>
                <p>{{ ds.message }}</p>
                
            </div>
    `,
})
export class DialogComponent implements OnInit,DoCheck,AfterViewInit {

    public ds  : IDialogStruct;

    //observable sources
    private dialog_selection = new Subject<IDialogStruct>();

    //announcements
    public dialogSel$ = this.dialog_selection.asObservable();

    // Service commands
    public set_dialogSel(dialogStruct:IDialogStruct) {
        this.dialog_selection.next(dialogStruct);
    }

    evt_progressBar_value:number=0;

    constructor(public dialogRef: MdDialogRef<DialogComponent>
                ,private _restService:RestService
            ) {

        if (dbg_print) console.log('In constructor DialogComponent');

         this.dialogSel$.subscribe(
         selStruct => {
            if (selStruct.dialogSelection == 'info'  || selStruct.dialogSelection == 'confirm' || selStruct.dialogSelection == 'href_confirm' || selStruct.dialogSelection == 'loading' || selStruct.dialogSelection == 'warning' )
            {
                if (dbg_print) console.log('selStruct=',selStruct);

                this.ds = selStruct;
                //this.ds.dialogSelection == selStruct.dialogSelection;
                //this.ds.title
            }
            else console.log("Error : In uaFormModal, selStruct.dialogSelection = ",selStruct.dialogSelection );

         });

       _restService.dialogSel$.subscribe(val => this.evt_progressBar_value = val);
    }

    ngOnInit()
    {
        if (dbg_print) console.log("In ngOnInit for DialogComponent");
    }

    ngDoCheck()
    {
      // console.log("ds=",this.ds);
    }

    ngAfterViewInit()
    {
        if (dbg_print) console.log("In ngAfterViewInit for DialogComponent");
    }



}