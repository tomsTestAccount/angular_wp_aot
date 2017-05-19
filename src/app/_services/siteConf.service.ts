import { Injectable, EventEmitter} from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { DialogsService } from './dialogs.service';
import { Promise } from 'es6-promise';

const dbgPrint = false;


 // Todo: put these settings with formConfigurator in one big config-file ... !?  hmm , think twice about it?? one site-config (entryUrl, language, etc... ) and one formConfigurator

export const siteSettings = {
  //lang : "de" //'en'
    lang : 'de',
    applicationEntryPath : "bewerbungen"
}

@Injectable()
export class SiteConfig_Service{


    private serverURL : string = "";
    private host : string = "";
    private userId: string = "";
    private applicationEntryPath = siteSettings.applicationEntryPath;

    public onDevelopmentEnv = false;
    //public browserNotSupported : boolean;

    //public browserNotSupported: EventEmitter<any> = new EventEmitter();

    //private _browserNotSupported = new Subject<boolean>();
    //public browserNotSupported$ = this._browserNotSupported.asObservable();
    private browserVersion:string;
    private isBrowserSupported: boolean;

    constructor(//private _dialog:DialogsService
        )
    {
        let locUrl = {
						host:"",
						protocol:"",
						pathname:"",
						};//window.location;

        let locUrl_location = window.location;

        if (dbgPrint) console.log("locUrl=",locUrl );
		if (dbgPrint) console.log("locUrl_location=",locUrl_location );

        this.browserVersion = this.detectNotSupportedBrowser();

        if (this.browserVersion.length >=1 ) this.isBrowserSupported = false;
        else this.isBrowserSupported = true;


        if (dbgPrint) console.log("browserVersion=",this.browserVersion);

        if (locUrl_location.hostname.indexOf('localhost') != -1) {
            //we're on developent system, so we need rest-login and authorization token
            this.onDevelopmentEnv = true;


            if (dbgPrint) console.log("we're on development");
            if (locUrl_location.pathname.indexOf('Plone') == -1)
            {
                //we're on node-server
                if (dbgPrint) console.log(".. on node-server");
                this.serverURL = 'http://192.168.159.130:8080/Plone'; //for vmWare with PLone-instance running

                //locUrl.serverURL = this.host  + applicationPath ;
                this.userId = '';

            }
        }
        else {
            //we're on production system (running within plone)
            if (dbgPrint) console.log("we're on production");
            this.onDevelopmentEnv = false;

            let splitHref = locUrl_location.href.split("/");
            this.serverURL  = splitHref.slice(0, splitHref.length - 1).join("/") + "/";
            if (dbgPrint) console.log("this.host=",this.host);

            //this.host = locUrl_location.protocol + '//' + this.host ;

            //todo:found userId in url
            if (locUrl_location.pathname.indexOf(this.applicationEntryPath) != -1) {
                let splitPathname = locUrl_location.pathname.split("/");
                if (dbgPrint) console.log("splitPathname =", splitPathname, "this.host=", this.host);
                if (splitPathname.length) {
                    this.userId = splitPathname[splitPathname.length - 2];
                }
            }
        }

    }


    set_userId(userId:string)
    {
        this.userId = userId;
    }

    get_serverConfigs()
    {
        /*
        let srvObj = {
            userId: this.userId,
            url : this.serverURL ,
            host: this.host
        };
        */

      let srvObj = {
        serverURL:this.serverURL,
        userId: this.userId,
        host: this.host,
        applicationEntryPath: this.applicationEntryPath,
      };

        return srvObj;
    }

    //----------------------------------------------------------------------------------------------

    getBrowserSupport():any{

        return this.isBrowserSupported;

        /*return new Promise((resolve, reject) =>
        {
            resolve(this.browserVersion);

        });
        */
    };

    /**
     * detect not supported IE (<=10)
     * returns version of IE or null, if browser is higher or not Internet Explorer
     */
    private detectNotSupportedBrowser():string {
        var ua = window.navigator.userAgent;

        // Test values; Uncomment to check result …

        // IE 10
        // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

        // IE 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

        // IE 12 / Spartan
        // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

        // Edge (IE 12+)
        // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return (parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10)).toString();

        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            //return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
            return "";
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            //return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
            return "";
        }

        // other browser
        return "";
    }



}

export const RunningConfigs = {
    runWithFakeBackend : false
}
