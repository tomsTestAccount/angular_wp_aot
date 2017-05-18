// app/translate/translation.ts

import { OpaqueToken } from '@angular/core';
import { InjectionToken } from '@angular/core';


// import translations
import { LANG_EN_NAME, LANG_EN_TRANS } from './lang-en';
import { LANG_DE_NAME, LANG_DE_TRANS } from './lang-de';


// translation token
//export const TRANSLATIONS = new OpaqueToken('translations');  depracated since v4
export const TRANSLATIONS = new InjectionToken('translations');

/*  NOT WORKING ON AOT --> we have to use a factory for that , see below
	// all translations
	const dictionary = {
		[LANG_EN_NAME]: LANG_EN_TRANS,		//[LANG_EN_NAME]
		[LANG_DE_NAME]: LANG_DE_TRANS			//[LANG_DE_NAME]
	};


	// providers
	export const TRANSLATION_PROVIDERS = [
		{ provide: TRANSLATIONS, useValue: dictionary },
	];
*/

export function dictionaryFactory() {

	return {
		[LANG_EN_NAME]: LANG_EN_TRANS,		//[LANG_EN_NAME]
		[LANG_DE_NAME]: LANG_DE_TRANS		//[LANG_DE_NAME]
	};
};


export function dictionaryFactory2() {
	return LANG_DE_TRANS;
};


// providers
export const TRANSLATION_PROVIDERS = [
 { provide: TRANSLATIONS, useFactory: dictionaryFactory}

 ];


