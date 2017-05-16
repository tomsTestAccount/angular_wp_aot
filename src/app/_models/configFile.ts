


const dbgPrint = true;


//Todo: put these settings with formConfigurator in one big config-file ... hmm , think about it??

export const FormSettings = {
  //lang : 'english'
  lang : "german", 
}


export class ServerConfigs {


    private serverURL : string = "";
    private host : string = "";
    private userId: string = "";
    private applicationEntryPath = "bewerbungen"; //'applications';

    public onDevelopmentEnv = false;

    constructor()
    {
        let locUrl = {
						host:"",
						protocol:"",
						pathname:"",
						};//window.location;

        let locUrl_location = window.location;

        if (dbgPrint) console.log("locUrl=",locUrl );
		if (dbgPrint) console.log("locUrl_location=",locUrl_location );


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

}

export const RunningConfigs = {
    runWithFakeBackend : false
}
