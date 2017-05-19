import { Component,OnInit } from '@angular/core';
import {MainFormComponent} from './dynamicForm/mainform.component';
import { SiteConfig_Service } from './_services/siteConf.service';


@Component({
    selector: 'my-app',
    template: `
        <div *ngIf="browserSupported !== true" >
            <md-card class="ua-cardBg">
                <md-card-content class="uacard-content" >
                    {{'browserNotSupported' | translate}}
                </md-card-content>
            </md-card>
        </div>
		<div *ngIf="browserSupported === true" class="container">
		
          <rt-mainForm></rt-mainForm>
  
        </div>
    `,
    providers: [MainFormComponent]
})

export class AppComponent implements OnInit{

    browserSupported: boolean = true;

    constructor( public rtMainFormComp:MainFormComponent,
                private _siteConfigs:SiteConfig_Service)
    {}

    ngOnInit() {
        this.browserSupported = this._siteConfigs.getBrowserSupport();
    }
}
