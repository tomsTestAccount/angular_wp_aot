import { Injectable, Inject } from '@angular/core';
import {
    Http, Headers, RequestOptions, Response, BrowserXhr, XHRBackend,
    RequestOptionsArgs
} from '@angular/http';

import { User4Create } from '../_models/user';
import {Observable} from "rxjs/Rx";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import { Subscription } from 'rxjs/Subscription';

import { ProgressHttp } from "angular-progress-http";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/timeout';

import 'rxjs/add/observable/throw';

import {SiteConfig_Service} from './siteConf.service';
import { Subject } from 'rxjs/Subject';


const dbgPrint_getUser = false;
const dbgPrint = false;

//---------------------------------------------------------------------------------------------------


//---------------------------------------------------------------------------------------------------

@Injectable()
export class RestService {

    public serverURL : string;
    public host : string;
    public userId:string;
    public applicationEntryPath:string;
    public onDevEnv:boolean = false;
    private runningConfs:any;

    constructor(private http: ProgressHttp,

                private _siteConfs: SiteConfig_Service,
               // private x : CustomBrowserXhr,
               // private p : ProgressService
                )
    {
        this.runningConfs = _siteConfs;
        let serverConfigs = this.runningConfs.get_serverConfigs();
        //this._currentUserId = 'mueller';
        this.serverURL = serverConfigs.serverURL; // + '/' + serverConfigs.applicationEntryPath;
        this.applicationEntryPath = serverConfigs.applicationEntryPath;
        this.userId = serverConfigs.userId;

        this.onDevEnv = this.runningConfs.onDevelopmentEnv;

        if (dbgPrint) console.log("serverURL=",this.serverURL);

        /*
        this.x.build();
        var d: Subscription,u: Subscription;
        d = this.p.downloadProgress.asObservable().subscribe( e => console.log(e));
        u = this.p.uploadProgress.asObservable().subscribe( e => console.log(e));
        */
    }

    /********************************************Progress Event *******************************************************/

    ///observable sources
    private httpProgressEvent = new Subject<number>();

    //announcements
    public dialogSel$ = this.httpProgressEvent.asObservable();

    // Service commands
    private set_progressValue(progressValue: number) {
        this.httpProgressEvent.next(progressValue);
    }

	/*********************************** PLONE-RESTAPI **************************************************************/


    //var serverURL = SiteConfig_Service.restServer;

    //create user
    restPost_create(newUser: User4Create) {

        let body = JSON.stringify(newUser);
        /*({

            email:newUser.email,
            lastName:newUser.lastName,
            firstName:newUser.firstName,
            password:newUser.password
        })
        */

        //console.log("In restPost_login, this.serverURL= ",this.serverURL,body);

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        //console.log("body",body);
        //this.serverURL = this._location.path();

        return this.http.post(this.serverURL + '/@users'                               //req
            ,body                                                                      //body
            ,{headers:headers}                                                         //header
        ).map((response: Response) => response.json());
        //.catch((error:any) => Observable.throw(error.json().error || 'Unknown Server error at "restPost_create" '));
    }


    //login - post
    restPost_login(userId:string,password:string): Observable<{}> {

        if (this.userId.length == 0) this.runningConfs.set_userId(userId);

        let bodyContent = {login: userId, password: password};

        let body = JSON.stringify(bodyContent);

        //console.log("In restPost_login, this.serverURL= ",this.serverURL,body);

        let headers = new Headers();
        headers.append('Accept', '*,application/json');
        headers.append('Content-type', 'application/json');
        //headers.append('Content-type', 'application/json');
        //headers.append('Content-type', 'application/json');

        return this.http.post(this.serverURL + '/@login',
        body                    //body
        ,{ headers: headers }//headers//,this.jwt()                                            //header
        )// ...and calling .json() on the response to return data
            .map((response: Response) => response.json())
        //...errors if any
            //.catch((error:any) => Observable.throw(error.json().error || 'Unknown Server error for "restPost_login" '))
        ;
    }


    //get user application form entries -get
    restGet_getUserData(userId: string,token:string):Observable<any> {

        if (!userId) userId = this.userId;

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        //headers.append('Content-type', 'application/json');
        if (token) headers.append('Authorization','Bearer ' + token);

        //console.log("in restService,auth_getFormObject: user=",user);
        return this.http.get(this.serverURL + '/@users/'              //url req-main
            + userId                                                                        //url req-sub
            ,{headers:headers}                          //({headers: new Headers({'Authorization':token}) }) //({'Authorization':'Bearer ' + token})                                          //header
            //.retry(1)
        ).map((response: Response) => response.json())
            //.catch((error:any) => Observable.throw(error.json().error || 'Unknown Server error at "restGet_getUserData" '))
        ;

    }

    //update user
    restPatch_updateUserdata(userId: string,token:string,userData:any):Observable<any> {

        if (!userId) userId = this.userId;

        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        if (token) headers.append('Authorization','Bearer ' + token);

        let body = JSON.stringify(userData);

        //console.log("in restService,auth_getFormObject: user=",user);
        return this.http.patch(this.serverURL + '/@users/'                                        //url req-main
            + userId                                                                                                    //url req-sub
            ,body                                                                            //(userData)                                                                        //body
            ,{headers:headers} //,({headers: new Headers({'Authorization':token}) })                               //({'Authorization':'Bearer ' + token})                 //header
            //.retry(1)
        ).map((response: Response) => response.json())
            //.catch((error:any) => Observable.throw(error.json().error || 'Unknown Server error at "restGet_getUserData" '))
            ;

    }


    //get user application form entries

    restGet_formObject(userId: string, token:string):Observable<{}> {

        if (!userId) userId = this.userId;

        let headers = new Headers();
        headers.append('Accept', 'application/json');

        // Trial to solve ie chache problem
        //headers.append('X-Custom-Header', (new Date().getTime()).toString());
        headers.append('Cache-Control', 'no-cache');
        headers.append('Pragma', 'no-cache');
        headers.append('Expires', '0');
        var date4_notCacheRequest =  (new Date().getTime()).toString();

        if (token) headers.append('Authorization','Bearer ' + token); //'Authorization':'Bearer '

        if (dbgPrint_getUser) console.log("in restService,restGet_formObject: userId=",userId);

        return this.http.get(this.serverURL + '/' + this.applicationEntryPath + '/' + userId +'/'+userId           //url req-main
                                                                            //url req-sub
            ,{headers:headers}                                     //header

        )   .map((response: Response) => response.json())
            //.catch((error:any) =>  Observable.throw(error.json().error || 'Unknown Server error at "restGet_getUserData"! See Debug-Console for more Information '))
            ;
    }

    //---------------------------- SEND FORM OBJECT

    //patch user application form entries
    restPatch_formObject(userId: string,token:string,form:any):Observable<any> {

        if (!userId) userId = this.userId;

        let headers = new Headers();
        //headers.append('Content-type', 'application/json');
        headers.append('Accept', 'application/json');
        if (token) headers.append('Authorization','Bearer ' + token); //'Authorization':'Bearer '

        //let body = JSON.stringify(form);
        //TODO: check if valid JSON
        let body = form;


        var obs : Observable<any>;

        /*
        var subscription : Subscription;


        let timer = TimerObservable.create(10, 20);
        subscription = timer.subscribe(x => console.log(x));
        */


        //console.log("in restService,auth_getFormObject: user=",user);
        obs = this.http
            .withUploadProgressListener(progress => { this.set_progressValue(progress.percentage); console.log(`Uploading ${progress.percentage}%`); })
            .withDownloadProgressListener(progress => { this.set_progressValue(progress.percentage); console.log(`Downloading ${progress.percentage}%`); })
            .patch(this.serverURL + '/' + this.applicationEntryPath + '/' + userId +'/'+userId                                        //url req-main
            ,body                                                                            //(userData)                                                                        //body
            ,{headers:headers} //,({headers: new Headers({'Authorization':token}) })                               //({'Authorization':'Bearer ' + token})                 //header
            //.retry(1)
        ).map((response: Response) => response.json())
            //.finally( () => { subscription.unsubscribe() ; } )
            //.catch((error:any) => Observable.throw(error.json().error || 'Unknown Server error at "restGet_getUserData" '))
            //.catch((error:any) => Observable.throw(error.json().error || 'Unknown Server error at "restGet_getUserData" '))
            ;

        //subscription.unsubscribe();



        return obs;

    }




    //----------------------------------------------------------------------------------------------------------------

    //thta file-rest-api is not used for plone in the moment
    restDelete_File(userId: string,token:string,fileId:string)
    {
        let headers = new Headers();
        //headers.append('Content-type', 'application/json');
        headers.append('Accept', 'application/json');
        if (token) headers.append('Authorization','Bearer ' + token); //'Authorization':'Bearer '


        return this.http.delete(this.serverURL + '/' + fileId                                       //url req-main
            //body
        ,{headers:headers} //,({headers: new Headers({'Authorization':token}) })                               //({'Authorization':'Bearer ' + token})                 //header
        //.retry(1)
        ).map((response: Response) => response.json())
    }


    public restDownload_File(userId: string,token:string,fileObj:any)
    {
        let headers = new Headers();
        //headers.append('Content-type', 'application/json');
        headers.append('Accept', 'application/json');
        if (token) headers.append('Authorization','Bearer ' + token); //'Authorization':'Bearer '

        return this.http.get(fileObj.download                                       //url req-main
            //body
            ,{headers:headers} //,({headers: new Headers({'Authorization':token}) })                               //({'Authorization':'Bearer ' + token})                 //header
            //.retry(1)
        ).map((response: Response) => response.json())
    }


    //--------------------------------------------------------------------------------


};
//_______________________________________________________________________________________________________________________________



//_______________________________________________________________________________________________________________________________-

@Injectable()
export class FileUploadService {
    /**
     * @param Observable<number>
     */
    private progress$: Observable<number>;

    /**
     * @type {number}
     */
    private progress: number = 0;

    private progressObserver: any;

    constructor () {
        this.progress$ = new Observable(observer => {
            this.progressObserver = observer
        });
    }

    /**
     * @returns {Observable<number>}
     */
    public getObserver (): Observable<number> {
        return this.progress$;
    }

    /**
     * Upload files through XMLHttpRequest
     *
     * @param url
     * @param files
     * @returns {Promise<T>}
     */
    public upload (url: string, files: File[]): Promise<any> {
        return new Promise((resolve, reject) => {
            let formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();

            for (let i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
            }

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            FileUploadService.setUploadUpdateInterval(500);

            xhr.upload.onprogress = (event) => {
                this.progress = Math.round(event.loaded / event.total * 100);

                this.progressObserver.next(this.progress);
            };

            xhr.open('PATCH', url, true);
            xhr.send(formData);
        });
    }

    /**
     * Set interval for frequency with which Observable inside Promise will share data with subscribers.
     *
     * @param interval
     */
    private static setUploadUpdateInterval (interval: number): void {
        setInterval(() => {}, interval);
    }
}