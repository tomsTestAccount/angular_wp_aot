import {Component, Input, DoCheck, OnInit,AfterViewInit} from '@angular/core';
import { FormGroup,FormControl,FormBuilder }        from '@angular/forms';
//import { TranslateService } from '../translate';
import {siteSettings} from '../_services/siteConf.service';
//----------------------------------------------------------------------------------------------------------------------

const dbgPrint_lifecyclehooks = false;
const dbgPrint_dateEntry = false;
const dbgPrint_fileEntry = false;
const dbgPrint_validateString = false;
//----------------------------------------------------------------------------------------------------------------------


@Component({
    //moduleId: module.id,
    selector: 'rt-input',
    //template:html,
    //styleUrls: ['../css/rtFormInputs.css']
    //styles:[css]
    templateUrl: 'rt-input.component.html',
    styleUrls: ['rtForm.css']
})
export class rtInputComponent implements OnInit,DoCheck,AfterViewInit {


    valueAsDate : Date;
    minDate : Date;
    maxDate : Date;

    tmpArray : any[];
    valObj: any;
    //------------------------------

    @Input() formEntry: any;
    @Input() formgroup: FormGroup;
    @Input() dbgPrint:boolean;

    showTooltip =  false;
    isOpened=true;
    entryErrorString : string[];

    calenderLanguage : any;

    constructor()
    {

       //if(dbgPrint_lifecyclehooks) console.log("In rt-input constructor, this.formEntry = ", this.formEntry );
    }

    ngDoCheck() {

        if (this.formEntry !== undefined)
        {
            this.checkValidationErrorExists();
        }
    }

    ngOnInit(): void {


        if (this.dbgPrint) console.log("In rt-Input ngOnInit: Formgroup=", this.formgroup,", this.formEntry=", this.formEntry.key);

        if (this.formEntry.collapsible_box_title) {

            this.isOpened = false;
            this.toggle_isOpened();     ////this.formgroup.controls[this.formEntry.key].disable();

           // setTimeout(() => {this.isOpened = false},1);
        }

        if (this.formEntry.type == 'fileUpload') {


            //if (dbgPrint_fileEntry) console.log("Input-entry: File-upload, this.formEntry=", this.formEntry);

            if (dbgPrint_fileEntry)
            {
                if (this.formEntry.key == 'copy_of_certificate') {
                    //console.log("Input-entry: File-upload, this.formEntry=", this.formEntry);
                    console.log("FormControl copy_of_certificate : FormControl=", this.formgroup.controls[this.formEntry.key]);
                }
            }

            if ( (this.formEntry.defaultValue) && (this.formEntry.defaultValue.filename))
            {
                this.isOpened = true;
                this.toggle_isOpened();     ////this.formgroup.controls[this.formEntry.key].enable();

                //setTimeout(() => {this.isOpened = true},1);
            }
        }
        else if (this.formEntry.type == 'date') {


             if (dbgPrint_dateEntry) console.log("Input-entry: DATE, this.formEntry=", this.formEntry);


             if (this.formEntry.options.minDate !== undefined && this.formEntry.options.maxDate !== undefined) {
                this.formEntry.options.minDate = new Date(this.formEntry.options.minDate);
                this.formEntry.options.maxDate = new Date(this.formEntry.options.maxDate);
             }
             else if (this.formEntry.options.yearRange !== undefined) {
                let range = this.formEntry.options.yearRange.split(':');
                this.formEntry.options.minDate =  new Date(range[0] + '-01-01');
                this.formEntry.options.maxDate =  new Date(range[1] + '-12-31');
             }
             else
             {
                this.formEntry.options.minDate = new Date("1975-01-01");
                this.formEntry.options.maxDate = new Date();
             }

             //defaultDate (minDate) or loadedDate
             if (this.formEntry.defaultValue) {
                 this.formEntry.defaultValue = new Date(this.formEntry.defaultValue);
             }
             let showedDate = this.formEntry.defaultValue || this.formEntry.options.minDate;
             this.valueAsDate = showedDate;

             //this.formEntry.options.minDate = null;
             //this.formEntry.options.maxDate = null;

             if (dbgPrint_dateEntry) console.log("this.formEntry.options=", this.formEntry.options);


            if (siteSettings.lang == 'de') {
                this.calenderLanguage = {
                    firstDayOfWeek: 0,
                    dayNames: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Dienstag", "Freitag", "Samstag"],
                    dayNamesShort: ["Son", "Mon", "Die", "Mit", "Don", "Fre", "Sam"],
                    dayNamesMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
                    monthNames: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
                    monthNamesShort: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
                };
            }
            else //default
            {
                this.calenderLanguage = {
                    firstDayOfWeek: 0,
                    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                };

            }

        }
        else if (this.formEntry.type == 'bool') {
          this.formEntry.options = [
            {
              name: 'true'
            },
            {
              name: 'false'
            }
          ];
        }
        /*
        else if (this.formEntry.type == 'mselect-prio-grid') {

        }
        */
    }



    ngAfterViewInit():void {


    }


    toggleInfo(e:any):void{
        this.showTooltip = !this.showTooltip;
        e.stopPropagation();
    }

    toggle_isOpened(value?) {

        setTimeout(()=> {			//bugfix for angular.io changeDetection in Dev-Mode; see issue #6005 (EXCEPTION: Expression has changed after it was checked)
            if (!this.isOpened)
            {
                this.formgroup.controls[this.formEntry.key].disable();
            }
            else
            {
                this.formgroup.controls[this.formEntry.key].enable();
            }

            /*if (this.formEntry.key == 'copy_of_certificate') {
                //console.log("Input-entry: File-upload, this.formEntry=", this.formEntry);
                console.log("FormControl copy_of_certificate : FormControl=", this.formgroup.controls[this.formEntry.key]);
            }
            */

        },1);

    }

    //used in html-template to show info for user for invalid input
    /*entryErrorString_OLD() {

        let retValue =  "Not an valid input : ";
        let errorInfos = "";

        if (this.formgroup.controls[this.formEntry.key].errors)
        {
            //setTimeout(()=> {                   //bugfix for angular.io changeDetection in Dev-Mode; see issue #6005 (EXCEPTION: Expression has changed after it was checked)
                let errRef = this.formgroup.controls[this.formEntry.key].errors;

                //console.log("errType=",errRef);

                for (let errType in errRef) {
                    //console.log("errType=",errType);
                    //retValue += errType.toString + '/n';

                    for (let errReason in errRef[errType]) {
                        errorInfos += ' ,' + errReason.toString() + ":" + errRef[errType][errReason].toString();
                    }
                    //this.cdr.detectChanges(); // detect changes           //bugfix for angular.io changeDetection in Dev-Mode; see issue #6005 (EXCEPTION: Expression has changed after it was checked)
                    break;
                }
           // },1);
        }

        errorInfos = errorInfos.slice(2,errorInfos.length);
        retValue = retValue + errorInfos;
        return retValue;
    }
    */

    checkIfRequired():boolean
    {
      if (this.formEntry.validators)
      {
        //this.formEntry.validators.forEach((e,i)=> {
        for (let i=0;i<this.formEntry.validators.length;i++) {
          let e = this.formEntry.validators[i];
          if (e === 'required') {
            //console.log("formEntry=", this.formEntry);
            return true;
          }
        }
        //});
      }
      //console.log("formEntry=", this.formEntry);
      return false;
    }

    checkValidationErrorExists()
    {
        let retValue = ["notValid"];
        let errorInfos = "";

        if (this.formgroup.controls[this.formEntry.key].errors)
        {
            //setTimeout(()=> {                   //bugfix for angular.io changeDetection in Dev-Mode; see issue #6005 (EXCEPTION: Expression has changed after it was checked)
            let errRef = this.formgroup.controls[this.formEntry.key].errors;
            let tmpErrArray = [];



            for (let errType in errRef) {

                //handle angular-own validation-struct
                if (errType == 'minlength' || errType == 'maxlength')
                {
                    let errType_Obj = errRef[errType];
                    for (let errType_prop in errType_Obj) {
                        tmpErrArray.push(errType_prop.toString());
                        tmpErrArray.push(':');
                        tmpErrArray.push((errType_Obj[errType_prop]).toString());
                        tmpErrArray.push(', ');
                        //console.log("errRef=", errRef);
                    }
                    tmpErrArray = tmpErrArray.slice(tmpErrArray[0],tmpErrArray.length-1);
                }
                else tmpErrArray.push(errType);

                break;
            }

            if (tmpErrArray.length == 0) tmpErrArray.push('required');

            retValue = retValue.concat(tmpErrArray);


            if (dbgPrint_validateString) console.log("retValue = ",retValue);

            this.entryErrorString = retValue;

        }
        else this.entryErrorString  =  [];
    }

}
