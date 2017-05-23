import { Injectable } from '@angular/core';

import {FormControl, Validators, AbstractControl,FormGroup}  from '@angular/forms';


const dbgPrint_Validation = false;

@Injectable()
export class rtFormValidators {

    constructor() {
    }


    validateArray(c: FormControl) {

        let retValue = null; //= {notValid: true};
        if (c != null) {

            retValue = (c.value.length == 0) ? {notValid: true} : null;

            //console.log("In validateArray, c=",c, ', c.value.length=', c.value.length);
        }

        if (dbgPrint_Validation) console.log("Idsafsd c=", c, ', c.value.length=', c.value.length);

        return retValue

    }


    validateCourseList(c: FormControl) {

        let retValue = null; //{notValid: true};
        if ((!c.value) || (!c.value['table']) || (c.value['table'].length == 0)) {
            retValue = {notValid: {Course: 'was not added'}};
        }
        else if ((c.value['average'] != null) && (c.value['table'].length != 0)) {

            let numValue = parseFloat(c.value['average']);
            //retValue = (isNaN(numValue) || (numValue<=0)) ? {notValid: true} : null;

            if (isNaN(numValue)) retValue = {notValid: {input: 'is not a number'}};
            else if (numValue <= 0) retValue = {notValid: {input: 'is less than/equals zero '}};
            else retValue = null;
            //console.log("In validateCourseList, c=",c, ', retValue=', retValue);
        }

        if (dbgPrint_Validation) console.log("In validateCourseList, c=", c, ', retValue=', retValue);

        return retValue

    }

    validateEmail(c: FormControl) {

        let retValue = null;

        let required = c.parent; //validator;

        if ((c.value != null) && (c.value != '')) {

            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            //console.log(" re.test(c.value)=", re.test(c.value));
            //retValue = re.test(c.value) ? null : {notValid:{email: ' wrong email address notation'}} ;
            retValue = re.test(c.value) ? null : {'emailNotValid': ''};


        }


        if (dbgPrint_Validation) console.log("In validateEmail, c=", c, ', retValue=', retValue, required);

        return retValue

    }

    validateNumberNotZero(c: FormControl) {

        let retValue = null; //= {notValid: true};
        if ((c.value != null)) {

            let numValue = parseFloat(c.value);
            if (isNaN(numValue)) retValue = {'notANumber': ''};
            else if (numValue <= 0) retValue = {'numZero': ''};
            else retValue = null;


            //console.log("In validateCourseList, c=",c, ', retValue=', retValue);
        }

        if (dbgPrint_Validation) console.log("In validateNumberNotZero, c=", c, ', retValue=', retValue);

        return retValue

    }

    validatePhoneNumber(c: FormControl) {

        let retValue = null; //= {notValid: true};
        let required = c.parent; //validator;

        if ((c.value != null) && (c.value != '')) {

            //var re = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
            var re = /^((\\+)|(00)|(\\+\\+)|())[0-9 | ()]{3,14}((\\#)|())$/;

            retValue = re.test(c.value) ? null : {'wrongPhoneNumber': ''};

        }

        if (dbgPrint_Validation) console.log("In validatePhoneNumber, c=", c, ', retValue=', retValue);

        return retValue

    }


    validatePasswordConfirm(cConfirm: FormControl) {
        let retValue = {equal: false};

        if (cConfirm != null) {

            //console.log("c=",c);

            let cPwd = cConfirm.root.get('password');

            if (cPwd != null) {
                //retValue = (cPwd.value === cCPwd.value) ? null : {equal: false} ;

                if (cPwd.value === cConfirm.value) {
                    console.log("cPwd=", cPwd.value);
                    console.log("cCPwd=", cConfirm.value);

                    retValue = null;

                }
            }

        }
        return retValue;
    }

    validateURI(c: FormControl) {
        let retValue = null;

        let required = c.parent; //validator;

        if ((c.value != null) && (c.value != '')) {

            //var re = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
            var re = /^(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

            retValue = re.test(c.value) ? null : {'wrongUri': ''};

        }

        if (dbgPrint_Validation) console.log("In validateURI, c=", c, ', retValue=', retValue, required);

        return retValue
    }

    validateDate(c: FormControl) {
        let retValue = null;

        let required = c.parent; //validator;

        if ((c.value != null) && (c.value != '')) {

            //yyyy-mm-dd, but 0000-00-00
            //var re = /^\d{4}-\d{2}-\d{2}$/;
            //retValue = re.test(c.value) ? null : {notValid:{uri: ' wrong date format'}} ;

            var d = new Date(c.value);
            if (d) {
                //return false; // Invalid date (or this could be epoch)
                retValue = (d.toISOString().slice(0, 10) == c.value ? null : {'wrongDateFormat': ''});
            }
            else retValue = {'wrongDateFormat': ''};

        }
        if (dbgPrint_Validation) console.log("In validateDate, c=", c, ', retValue=', retValue, required);

        return retValue
    }

    validateFileUpload(c: FormControl) {

        let retValue = null; // {notValid: true};

        //TODO:   just a workaround here -> we have to wait for Max Jakob to implement  setting of 'null'-value to file-entries to plone-serialization

        if (c.value != null) {

            if ((c.value.size !== 'undefined') && (c.value.size <= 10)) {
                retValue = {notValid: {File: 'was not added'}};
                //console.log("In validateFileUpload c=",c, ', c.value=', c.value);
            }
            //if (dbgPrint_Validation) console.log("In validateArray, c=",c, ',c.value[0].filename =', c.value.filename);
        }


        //if (dbgPrint_Validation)  console.log("In validateFileUpload c=",c, ', c.value=', c.value);


        return retValue

    }

    //special handling for incompetent null-value handling by lmu-plone-server
    validateFileUpload_lmu(c: FormControl) {
        let retValue = null;

        let required = c.parent; //validator;

        if ((c.value != null) && (c.value.filename !== undefined ) && (c.value.filename !== null )) {

            //todo: more specififc tests and info
            if (c.value.size <= 0) retValue = {'noFile': ''};

        }
        else retValue = {'noFile': ''};


        if (dbgPrint_Validation) console.log("In validateFileUpload_lmu, c=", c, ', retValue=', retValue, required);

        return retValue
    }


    validateGroup_CheckboxEnabled(group: FormGroup) {
        /*
         const range = group.controls[0].find(r => r.id === Number(group.value.range));
         if(range && (group.value.specificValue < range.min || group.value.specificValue > range.max)) {
         return {
         outsideRange: true
         };
         }
         */
    };

}
