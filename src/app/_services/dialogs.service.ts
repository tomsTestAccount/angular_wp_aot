import { Observable } from 'rxjs/Rx';
import { DialogComponent} from '../modal/DialogModal.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

const dbgDialog_Print = false;

@Injectable()
export class DialogsService {

    private dialogRef: MdDialogRef<DialogComponent>;
    private config: MdDialogConfig;
    private isDialog_open = false;

    constructor(private dialog: MdDialog) {
        this.config = new MdDialogConfig(); //disableClose = true;

    }

    public closeDialog()
    {
        if (dbgDialog_Print) console.log("In closeDialog 1, dialogRef=",this.dialogRef);

        if (this.dialogRef)
        {
            this.dialog.closeAll();
            //this.dialogRef.close(DialogComponent);
            if (dbgDialog_Print) console.log("In closeDialog 2, dialogRef=",this.dialogRef);
        }
        this.isDialog_open = false;
    }

    public goToHref_Confirm(title: string, message: Array<string>, hrefString?:string): Observable<string> {

        if (this.isDialog_open === true) this.closeDialog();

        if (dbgDialog_Print) console.log("In DialogService,confirm,title",title,",message=",message);

        this.dialogRef = this.dialog.open(DialogComponent);
        this.isDialog_open = true;

        this.dialogRef.componentInstance.set_dialogSel(
            {
                title: title,
                message:message,
                dialogSelection: 'href_confirm',
                href: hrefString
            }
        );

        return this.dialogRef.afterClosed();
    }

    public confirm(title: string, message?: Array<string>): Observable<boolean> {

        if (this.isDialog_open === true) this.closeDialog();

        if (dbgDialog_Print) console.log("In DialogService,confirm,title",title,",message=",message);

        this.dialogRef = this.dialog.open(DialogComponent);
        this.isDialog_open = true;

        this.dialogRef.componentInstance.set_dialogSel(
            {
                title: title,
                message:message,
                dialogSelection: 'confirm'
            }
        );

        return this.dialogRef.afterClosed();
    }

    public loading(title?: string, message?: Array<string>,progressBarMode?:string) {

        if (this.isDialog_open == true) this.closeDialog();

        //if (dbgDialog_Print) console.log("In DialogService,loading,title",title,",message=",message);

        //this.dialogRef = MdDialogRef<DialogComponent>;

        //this.config.disableClose = false;

        this.dialogRef = this.dialog.open(DialogComponent,this.config);
        this.isDialog_open = true;

        var prgrBarMode:string;
        if (progressBarMode !== undefined ) prgrBarMode = progressBarMode;

        this.dialogRef.componentInstance.set_dialogSel(
            {
                title: title || "Wait while Loading Data",
                message:message,
                dialogSelection: 'loading',
                progressBarMode:prgrBarMode
            }
        );

        if (dbgDialog_Print) console.log("In loading, dialogRef=",this.dialogRef);

        //return dialogRef.afterClosed();
    }

    public info(title: string, message?: Array<string>) {

        if (this.isDialog_open == true) this.closeDialog();

        if (dbgDialog_Print) console.log("In DialogService,info,title",title,",message=",message);

        //let dialogRef: MdDialogRef<DialogComponent>;

        this.dialogRef = this.dialog.open(DialogComponent);
        this.isDialog_open = true;
        //dialogRef.componentInstance.title = title;
        //dialogRef.componentInstance.message = message;


        this.dialogRef.componentInstance.set_dialogSel(
            {
                title: title ,
                message:message,
                dialogSelection: 'info'
            }
        );

        //return dialogRef.afterClosed();
    }

    public warning(title: string,message?: Array<string>) {

        if (this.isDialog_open == true) this.closeDialog();

        if (dbgDialog_Print) console.log("In DialogService,info,title",title,",message=",message);

        //let dialogRef: MdDialogRef<DialogComponent>;

        this.dialogRef = this.dialog.open(DialogComponent);
        this.isDialog_open = true;
        //dialogRef.componentInstance.title = title;
        //dialogRef.componentInstance.message = message;


        this.dialogRef.componentInstance.set_dialogSel(
            {
                title: title ,
                message:message,
                dialogSelection: 'warning'
            }
        );

        //return dialogRef.afterClosed();
    }
}



//------------- example
/*public openConfirmDialog() {
    this.dialogsService
        .confirm('Confirm Dialog', 'Are you sure you want to do this?')
        .subscribe(res => this.dialogResult = res);
}
*/