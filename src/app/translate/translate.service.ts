import {Injectable, Inject, EventEmitter} from '@angular/core';
import { TRANSLATIONS } from './translations'; // import our opaque token
import { siteSettings} from '../_models/configFile';

const dbgPrint = false;

@Injectable()
export class TranslateService {

	private _currentLang: string;


	public get currentLang() {
	  return this._currentLang;
	}

  // inject our translations
	constructor(@Inject(TRANSLATIONS) private _translations: any) {
	}


	// add event
	public onLangChanged: EventEmitter<string> = new EventEmitter<string>();

	//set language to use
	public use(lang: string): void {
		// set current language
		this._currentLang = lang;
	}


	//private translate with id-key
	private translate(key: string): string {
		// private perform translation
		let translation = key;

		if (!this.currentLang) this.init();

		if (dbgPrint) console.log("In translate, this.currentLang=",this._translations[this.currentLang], "key= ",key);


    	if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {

    		return this._translations[this.currentLang][key];
		}

		return translation;
	}

	//public translate
	public instant(key: string) {
		// public perform translation
		return this.translate(key); 
	}


	//init
	public init(defaultLang?:string)
	{
		if (defaultLang in this._translations) this.use(defaultLang);
		else if (siteSettings.lang in this._translations) this.use(siteSettings.lang);

		// set current language or fallback to defaultLanguage
		else this.use('en');


	}

}