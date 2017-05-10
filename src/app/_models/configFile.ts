


const dbgPrint = false;

/*
export var constSrvUrl:any;

export var serverInfos = {
  host:"",
  protocol:"",
  pathname:"",
  applicationEntryPath: "",
};
*/


//Todo: put these settings with formConfigurator in one big config-file ... hmm , think about it??

export const FormSettings = {
  lang : "german", //'english'
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
        //locUrl =

        let locUrl_location = window.location;

        if (dbgPrint) console.log("locUrl=",locUrl );

        if (locUrl_location.pathname.indexOf('Plone') == -1)
        //if(1)
		    {
            //we're on developent system, so we need rest-login and authorization token
            this.onDevelopmentEnv  = true;
            this.host = 'http://192.168.159.130:8080/Plone'; //for vmWare with PLone-instance running
            //locUrl.serverURL = this.host  + applicationPath ;
            this.userId = '';


        }
        else
        {
            //we're on production system (running within plone)
            this.onDevelopmentEnv  = false;
            this.host= locUrl_location.host;
            //this.serverURL = locUrl_location.protocol + '//' + this.host + '/Plone';

            //todo:found userId in url
            if (locUrl_location.pathname.indexOf(this.applicationEntryPath) != -1)
            {
                let splitPathname = locUrl_location.pathname.split("/");
                console.log("splitPathname =",splitPathname );
                if (splitPathname.length)
                {
                    this.userId = splitPathname[splitPathname.length-2];
                }

            }
        }



        /*
        this.host = _window.location.toString();
        var splitString = this.host.split('/');
        console.log("splitString=",splitString);

        var protocol =  splitString[0];
        var host_port = splitString[2].split(':');


        if (dbgPrint) console.log("host_port=",host_port);

        /*

        var host = "";
        var port = "";
        if (host_port.length>1)
        {
            host = host_port[0];
            port = host_port[1];
        }
        else host = splitString[2];

        */

        //var host = '192.168.159.130:8080';
        var host = 'localhost:8080';

        /*
        var port;
        if (protocol == 'http:')
            port = '8080';
        else
            port = '8443';
        */

        var host = 'http://192.168.159.130:8080';

        //this.serverURL = protocol + '//' + host + ':' + port + '/Plone';
        //this.serverURL = protocol + '//' + host + '/Plone';


        if (dbgPrint)  console.log("serverURL=",this.serverURL);

        //constSrvUrl = this.serverURL;

        //serverInfos = locUrl;
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
