import { NgModule }      		from '@angular/core';
import { BrowserModule } 		from '@angular/platform-browser';
import { FormsModule }   		from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule }    		from '@angular/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { MaterialModule } 		from '@angular/material';

import { CalendarModule }            from 'primeng/components/calendar/calendar';
import { NgUploaderModule }        from 'ngx-uploader';

import  'hammerjs';

import {objValuesPipe,orderByPipe}          from './_pipes/key-value.pipe';
import {rtFileUploaderComponent} from './rtFormInputs/rt-file-uploader.component';

import {rtInputComponent}       from './rtFormInputs/rt-input.component';
import {rtGridBoxAddComponent}     from './rtFormInputs/rt-grid-box-add.component';
import {rtMSelectPrioGridComponent} from './rtFormInputs/rt-mselect-prio-grid.component';

import {DynamicSubFormComponent} from'./dynamicForm/dynamic-subform.component'

import { RestService } from './_services/rt-rest.service';
import {AuthenticationService} from './_services/rt-authentication.service';
import {RtFormService} from './_services/rt-forms.service'
import {SiteConfig_Service} from './_services/siteConf.service';

import {DialogsService}                 from './_services/dialogs.service'
import {DialogComponent}         from './modal/DialogModal.component';
import { MainFormComponent }     from './dynamicForm/mainform.component';

import { AppComponent} 			from './app.component';

import { TRANSLATION_PROVIDERS, TranslatePipe, TranslateService }   from './translate';

/*import {StartPageComponent} from './home/start-page.component';
import { AppLoginComponent} 			from './appLogin.component';
import { AppRoutingModule }             from './app-routing';
import {RtRegisterCompletion} from './register/rt-register-completion.component';
import {LoginComponent} from './login/rt-login.component';
*/

    var importsList = [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpModule,
		BrowserAnimationsModule,
		
		//AppRoutingModule,

        CalendarModule,
        NgUploaderModule

        ];

    var declarationList = [

        AppComponent,

        /*
        AppLoginComponent,
        StartPageComponent,
        LoginComponent,

        RtRegisterCompletion,
        */

        DialogComponent,
        MainFormComponent,
        DynamicSubFormComponent,
        rtFileUploaderComponent,
        rtInputComponent,
        rtGridBoxAddComponent,
        rtMSelectPrioGridComponent,
        objValuesPipe,
        orderByPipe,
        TranslatePipe];
        //getKeyValuePair];

    var providersList = [
        //UserDataService,
        RestService,
        AuthenticationService,
        SiteConfig_Service,

        RtFormService,
        DialogsService,

        TRANSLATION_PROVIDERS,
        TranslateService
        ];

        /********* Note that DialogComponent has been added to the entryComponents array. ********************************
        *** You need to add any component that is dynamically generated by the component factory resolver to this array.
        ******/
    var entryComponentsList=[
        DialogComponent
        ];

    //var bootstrapList = [AppLoginComponent];
    var bootstrapList = [AppComponent];



@NgModule({
    imports: [ ...importsList ],
    declarations: [ ...declarationList ],
    providers: [ ...providersList],
    entryComponents : [...entryComponentsList],
    bootstrap: [...bootstrapList]
})




    export class AppModule {
    }
