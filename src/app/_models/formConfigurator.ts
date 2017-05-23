
import { CountryList_de,CountryList}  from '../_models/countries';

import { siteSettings}  from '../_services/siteConf.service';

/* definition
{
   key: "Id",
   type: type,
   options: "Auswahl",
   title: title,
   secParagraphArray: "Description",
   defaultValue: "Defaultwert",
   required: "Required?",
   section: "Fieldset"
 },
*/

var countryList;
if (siteSettings.lang == 'de')  countryList = CountryList_de;
else countryList = CountryList;


const sel_master_formEntries = [
	 {
	   key: "degreeprogram",
	   type: "mselect-prio-grid",
     options : [
      {
       name: 'Informatik'
      },
      {
        name: 'Medieninformatik ohne Anwendungsfach'
      },
      {
         name: 'Medieninformatik mit Anwendungsfach Kommunikationswissenschaft'
      },
      {
         name: 'Medieninformatik mit Anwendungsfach Mediengestaltung'
      },
      {
         name: 'Medieninformatik mit Anwendungsfach Medienwirtschaft'
      },
      {
         name: 'Mensch-Computer-Interaktion'
      }
     ],
     gridOptions :  {
     whatToAdd: 'Studiengang', // string for the element to add
     allCols: 6,   // realAllCols - allCols = reservedCols e.g.  9-7 = 2; 2 cols are reserved for the add-button, see the number of cols of the gridCells below
     rowHeight: '42px',
     gridCells: [
       {
         rows: 1,
         cols: 6,
         title: 'Studiengang',
         //secParagraph: 'E.g.: Database Systems',
         id: 'course', //need for iteration in *.component.ts, has to be distinct for that entry
         type: 'text'
       }],
     },
	   title: "Masterprogramm",
	   secParagraphArray: ["Bitte beachten Sie:","Markieren Sie den gewünschten Studiengang. Sie können mehrere der angebotenen Studiengänge auswählen, müssen aber Prioritäten festlegen.",
                          "Falls Sie für ein Masterstudium akzeptiert werden, erhalten Sie einen Zulassungsbescheid für den Studiengang, den Sie mit der höchsten Priotität gekennzeichnet haben und für den die Kommission Sie als geeignet begutachtet hat.",
                            "Die Reihenfolge der Prioritäten ergibt sich von oben nach unten bei den ausgewählten Studiengängen (d.h. der oberste hat die höchste Priorität). Priorisieren Sie die Einträge mit den Pfeiltasten rechts"],
	   defaultValue: "False",
	   required: true,
     validators: ['required'],
	   section: "Auswahl Masterprogramm"
	 },
	 {
	   key: "reapplication",
	   type: "checkBox",
	   options: "",
	   title: "Wiederbewerbung",
	   secParagraphArray: ["Bitte anklicken, falls Sie sich schon einmal bei einem Eignungsfeststellungsverfahren für ein Masterstudium in Informatik/Medieninformatik an der LMU beworben haben"],
	   defaultValue: "False",
	   required: false,
     validators: ['required'],
	   section: "Auswahl Masterprogramm"
	 }
 ];

 const pers_data_formEntries = [
	 {
	   key: "title",
	   type: "text",
	   options: "",
	   title: "Name",
	   secParagraphArray: "",
	   defaultValue: "",
	   required: true,
     validators: ['required'],
	   section: "Stammdaten"
	 },
	 {
	   key: "firstname",
	   type: "text",
	   options: "",
	   title: "Vorname",
	   secParagraphArray: "",
	   defaultValue: "",
	   required: true,
     validators: ['required','minLength=3'],
	   section: "Stammdaten"
	 },
	 {
	   key: "lastname",
	   type: "text",
	   options: "",
	   title: "Nachname",
	   secParagraphArray: "",
	   defaultValue: "",
	   required: true,
     validators: ['required','minLength=3'],
	   section: "Stammdaten"
	 },
	 {
	   key: "gender",
	   type: "select",
	   options: [
				{
					name: 'male'
				},
				{
					name: 'female'
				}
			],
	   title: "Geschlecht",
	   secParagraphArray: "",
	   defaultValue: "",
	   required: true,
     validators: ['required','minLength=3'],
	   section: "Stammdaten"
	 },
	 {
	   key: "dateofbirth",
	   type: "date",
	   validators: ['required','validateDate'],
		 options: {
				dateFormat: "yy-mm-dd",
				dataType: "string",
				yearRange: "1965:1999",
				placeholder: "yyyy-mm-dd"
			},
	   title: "Geburtsdatum",
	   secParagraphArray: ["Bitte geben Sie Ihr Geburtsdatum ein"],
	   required: true,
	   section: "Stammdaten"
	 },
	 {
	   key: "nationality",
	   type: "select",
	   title: "Staatsangehörigkeit (Land)",
	   secParagraphArray: "",
     options: countryList,
	   defaultValue: "",
	   required: true,
     validators: ['required','minLength=3'],
	   section: "Stammdaten"
	 },
	 {
	   key: "street",
	   type: "text",
	   options: "",
	   title: "Straße und Hausnummer",
	   secParagraphArray: "",
	   defaultValue: "",
	   required: true,
     validators: ['required','minLength=3'],
	   section: "Stammdaten"
	 },
	 {
	   key: "postalcode",
	   type: "text",
	   options: "",
	   title: "Postleitzahl",
	   secParagraphArray: "",
	   defaultValue: "",
	   required: true,
     validators: ['required','minLength=3'],
	   section: "Stammdaten"
	 },
	 {
	   key: "residence",
	   type: "text",
	   options: "",
	   title: "Wohnort",
     defaultValue: "",
	   required: true,
     validators: ['required','minLength=3'],
	   section: "Stammdaten"
	 },
	 {
	   key: "country",
	   type: "select",
	   title: "Land",
     secParagraphArray: ["Bitte wählen Sie das Land aus, indem Sie aktuell Ihren Wohnsitz haben"],
     options: countryList,
	   defaultValue: "",
	   required: true,
       validators: ['required','minLength=3'],
	   section: "Stammdaten"
	 },
	 {
	   key: "phone",
	   type: "text",
	   options: "",
	   title: "Telefon",
	   secParagraphArray: "",
	   defaultValue: "",
	   required: true,
     validators: ['required','minLength=4'],
	   section: "Stammdaten"
	 },
	 {
	   key: "phone2",
	   type: "text",
	   options: "",
	   title: "Telefon (alternativ)",
	   secParagraphArray: ["Weitere Telefonnummer, z.B. Handy"],
	   defaultValue: "",
	   required: false,
       validators: ['minLength=4'],
	   section: "Stammdaten"
	 },
	 {
	   key: "fax",
	   type: "text",
	   options: "",
	   title: "Faxnummer",
	   secParagraphArray: ["Ihre Faxnummer (falls Verfügbar)"],
	   defaultValue: "",
	   required: "",
       validators: ['minLength=4'],
	   section: "Stammdaten"
	 },
	 {
	   key: "email",
	   type: "text",
	   options: "",
	   title: "Email",
	   secParagraphArray: "",
	   defaultValue: "",
	   required: true,
     validators: ['required','validateEmail'],
	   section: "Stammdaten"
	 },
	 {
	   key: "homepage",
	   type: "text",
	   options: "",
	   title: "Homepage",
	   secParagraphArray: ["Ihre Homepage (falls verfügbar). Die URI muss mit http(s):// beginnen. "],
	   defaultValue: "",
	   required: false,
     validators:  ['minLength=5','validateURI'],
	   section: "Stammdaten"
	 }
 ];
 const prev_education_formEntries = [
 {
   key: "education",
   type: "textarea",
   options: "",
   title: "Ausbildung",
   secParagraphArray: ["Bitte geben Sie alle besuchten Schulen bis zur Erlangung der Hochschulreife ein"],
   defaultValue: "",
   required: true,
   validators: ['required','minLength=10'],
   section: "Bisheriger Bildungsgang"
 },
 {
   key: "currentstudies",
   type: "textarea",
   options: "",
   title: "Gegenwärtiges Studium",
   secParagraphArray: ["Bitte geben Sie Ihre bisherigen Studiengänge an"],
   defaultValue: "",
   required: true,
   validators: ['required','minLength=5'],
   section: "Bisheriger Bildungsgang"
 },
 {
   key: "currentgraduation",
   type: "textarea",
   options: "",
   title: "Gegenwärtiger Abschluss",
   secParagraphArray: ["Bitte geben Sie an, welchen Studienabschluss Sie bisher erworben haben, der Sie zum Masterstudium berechtigt (z.B. Bachelor)",
                          "Falls noch nicht vorhanden, bitte den im jetzigen Studium angestrebten Abschluss "],
   defaultValue: "",
   required: true,
   validators: ['required','minLength=5'],
   section: "Bisheriger Bildungsgang"
 },
 {
   key: "university",
   type: "textarea",
   options: "",
   title: "Bezeichnung und Ort der Hochschule",
   secParagraphArray: ["Bitte geben Sie die genaue Bezeichnung der Hochschule ein"],
   defaultValue: "",
   required: true,
   validators: ['required','minLength=5'],
   section: "Bisheriger Bildungsgang"
 },
 {
   key: "graduation_date",
   type: "date",
   options: {
     dateFormat: "yy-mm-dd",
     dataType: "string",
     yearRange: "2001:2017",
     placeholder: "yyyy-mm-dd"
   },
   title: "Datum der Zeugniserteilung ",
   secParagraphArray: "",
   defaultValue: "",
   validators: ['required','validateDate'],
   required: false,
   section: "Bisheriger Bildungsgang"
 },
 {
   key: "copy_of_certificate",
   type: "fileUpload",
   options: {
     url: "",
     allowedExtensions: ['application/pdf'],
     calculateSpeed: true,
   },
   title: "Kopie des Abschlusszeugnisses (z.B. Bachelor) ",
   secParagraphArray: ["Bitte hochladen: Kopie des Abschlusszeugnisses, z.B. Bachelor (PDF format)"],
   //collapsible_info_text:' Bitte beachten: Die Datei wird erst durch Drücken des Speichern-Buttons auf dem Server gespeichert',
   defaultValue: "",
   required: false,
   section: "Bisheriger Bildungsgang"
 },
 {
   key: "late_certificate",
   type: "checkBox",
   options: "",
   title: "Abschlusszeugnis nicht verfügbar",
   secParagraphArray: ["Bitte anwählen, falls Sie das Abschlusszeugnis (z.B. Bachelor) nicht rechtzeitig innerhalb der Bewerbungsfrist einreichen können, weil es erst danach von Ihrer Hochschule ausgestellt wird"],
   defaultValue: "",
   required: false,
   section: "Bisheriger Bildungsgang"
 },
 {
   key: "copy_of_tor",
   type: "fileUpload",
   options: {
     url: "",
     allowedExtensions: ['application/pdf'],
     calculateSpeed: true,
   },
   title: "Transcript of Records oder Notennachweis",
   secParagraphArray: ["Bitte hochladen: Transcript of Records oder anderer Notennachweis (PDF format)"],
   defaultValue: "",
   validators: ['required','validateFileUpload_lmu'],
   required: true,
   section: "Bisheriger Bildungsgang"
 },
 {
   key: "ov_av_grade",
   type: "number",
   options: "",
   title: "Notendurchschnitt",
   secParagraphArray: ["Bitte geben Sie hier die Durchschnittsnote Ihres Abschlusses oder des vorläufigen Notenspiegels ein"],
   defaultValue: "",
   validators: ['required','validateNumberNotZero'],
   required: true,
   section: "Bisheriger Bildungsgang"
 },
 {
   key: "prev_obligations",
   type: "fileUpload",
   options: {
     url: "",
     allowedExtensions: ['application/pdf'],
     calculateSpeed: true,
   },
   title: "Nachweis zu Auflagen aus vorausgegangenen Master-EFV ",
   secParagraphArray: ["Sollten Sie aus einem vorausgegangenen Master-EFV als Zulassungsvoraussetzung Auflagen erhalten haben, laden Sie bitte den Nachweis über deren Erfüllung hier hoch (als PDF)"],
   defaultValue: "",
   required: false,
   section: "Bisheriger Bildungsgang"
 },
 {
   key: "src_bachelor",
   type: "select",
   options: [
    {
       //show: 'LMU',
       name: 'LMU_Informatics'
    },
    {
       //show: 'LMU',
       name: 'LMU_other'
     },
     {
       //show: 'Universität',
       name: 'other_university'
     },
     {
       //show: 'Universität',
       name: 'coop_edu'
     },
     {
       //show: 'Fachhochschule',
       name: 'university_of_applied_sciences'
     },
     {
       //show: 'anderes',
       name: 'other'
     }
  ],
   title: "Hochschulart, bei welcher der Bachelor erworben wurde",
   secParagraphArray: ["Bitte wählen Sie den Typ der Hochschule aus, bei der Sie den Bachelorgrad erworben haben"],
   defaultValue: "",
   required: true,
   validators: ['required','minLength=3'],
   section: "Bisheriger Bildungsgang"
 },
 {
   key: "lang_cert",
   type: "fileUpload",
   options: {
     url: "",
     allowedExtensions: ['application/pdf'],
     calculateSpeed: true,
   },
   title: "Sprachnachweis Deutsch oder Englisch",
   secParagraphArray: ["Gilt nur für ausländische Bewerber, die sich für den Masterstudiengang \"Mensch-Computer-Interaktion\" bewerben:",
                        "Bitte uploaden Sie hier einen Nachweis über Deutschkenntnisse (mindestens Niveau C1 des Gemeinsamen Europäischen Referenzrahmens für Sprachen) und/oder einen Englisch-Test."],
   defaultValue: "",
   required: false,
   section: "Bisheriger Bildungsgang"
 }
 ];

 // ----------------------------------------------------------------------------------
 const pers_interests_formEntries = [
 {
   key: "vita",
   type: "fileUpload",
   title: "Lebenslauf",
   options: {
     url: "",
     allowedExtensions: ['application/pdf','.txt','.docx','.doc'],
     calculateSpeed: true,
   },
   secParagraphArray: ["Bitte uploaden Sie Ihren Lebenslauf (Dateiformat: MS-Word, PDF oder reiner Text)"],
   defaultValue: "",
   required: true,
   validators: ['required','validateFileUpload_lmu'],
   section: "Neigungen und Interessen"
 },
 {
   key: "motivation",
   type: "fileUpload",
   options: {
     url: "",
     allowedExtensions: ['application/pdf','.txt','.docx','.doc'],
     calculateSpeed: true,
   },
   title: "Bewerbungsschreiben",
   secParagraphArray: ["Bitte laden Sie hier einen Aufsatz (von max. 1000-2000 Zeichen Länge) als PDF- oder WORD-Dokument oder auch als reine Textdatei hoch. ",
                        "In diesem Aufsatz sollten Sie das Interesse und die Fähigkeiten für ein Studium im Masterstudiengang unter ausführlicher Darstellung der bisherigen Leistungen im Erststudium erläutern."],
   defaultValue: "",
   required: true,
   validators: ['required','validateFileUpload_lmu'],
   section: "Neigungen und Interessen"
 },
 {
   key: "reference",
   type: "textarea",
   options: "",
   title: "Empfehlung kann von folgender Professorin oder folgendem Professor des Instituts für Informatik erfragt werden ",
   secParagraphArray: ["Referenzen (optional)"],
   defaultValue: "",
   validators: ['minLength=5'],
   required: false,
   section: "Neigungen und Interessen"
 },
 {
   key: "stay_abroad",
   type: "textarea",
   options: "",
   title: "Auslandsaufenthalte ",
   secParagraphArray: ["Falls zutreffend: Bitte machen Sie Angaben zu Auslandsaufenthalten"],
   defaultValue: "",
   validators: ['minLength=5'],
   required: false,
   section: "Neigungen und Interessen"
 },
 {
   key: "skills",
   type: "textarea",
   options: "",
   title: "Besondere Fähigkeiten ",
   secParagraphArray: ["Angabe besonderer Fachkenntnisse und Fertigkeiten"],
   defaultValue: "",
   validators: ['minLength=5'],
   required: false,
   section: "Neigungen und Interessen"
 },
 {
   key: "other_certificates",
   type: "fileUpload",
   options: {
     url: "",
     allowedExtensions: ['application/pdf'],
     calculateSpeed: true,
   },
   title: "Weitere Bescheinigungen",
   secParagraphArray: ["Falls vorhanden: Uploaden Sie bitte hier weitere Bescheinigungen über Praktika, Berufsausbildung, absolvierte Kurse aus dem IT-Bereich, Arbeitszeugnisse, etc. zusammengefasst in einer PDF-Datei."],
   defaultValue: "",
   required: false,
   section: "Neigungen und Interessen"
 },
 {
   key: "notification_emailed",
   type: "checkBox",
   options: "",
   title: " Bescheid per Email zustellen ",
   secParagraphArray: ["Die Bescheinigung des Eignungsfeststellungsverfahren werden standardmässig per Email verschickt. Wünschen Sie hingegen eine Zusendung per Briefpost, dann heben Sie die Auswahl dieses Feldes bitte auf."],
   defaultValue: "True",
   required: false,
   section: "Neigungen und Interessen"
 }
];

// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------

const selfEval_programming_formEntries = [
   {
    key: "pl_basics",
    type: "textarea",
    options: "",
    title: "In welchen Programmiersprachen haben Sie schon einmal programmiert?",
    secParagraphArray: "",
    required: false,
    section: "Programmierung"
  },
  {
    key: "pl_experienced",
    type: "textarea",
    options: "",
    title: "In welchen Programmiersprachen haben Sie schon mehr praktische Erfahrung, als in den ueblichen Grundlagenvorlesungen gelehrt wird?",
    secParagraphArray: "",
    required: false,
    section: "Programmierung"
  },
  {
    key: "design_patterns",
    type: "textarea",
    options: "",
    title: "Welche Design Patterns haben Sie schon einmal praktisch eingesetzt?",
    secParagraphArray: "",
    required: false,
    section: "Programmierung"
  },
  {
    key: "program_verification",
    type: "textarea",
    options: "",
    title: "Welche Methoden zur Programmverifikation kennen Sie?",
    secParagraphArray: "",
    required: false,
    section: "Programmierung"
  },
  {
    key: "client_server_prog",
    type: "textarea",
    options: "",
    title: "Welche konkreten Erfahrungen haben Sie mit Client-Server Programmierung?",
    secParagraphArray: "",
    required: false,
    section: "Programmierung"
  }
 ];

const selfEval_others_formEntries = [
{
    key: "theoretical_informatics",
    type: "multi-select-slider",
    options: [
      { name: "Chomsky Hierarchie"},
      { name:"Automaten"},
      {name:"Berechenbarkeit"},
      {name:"Komplexität von Problemen"},
      {name: "NP-Vollständigkeit"}
	],
	secParagraphArray: ["Zu welchen Themen der Theoretischen Informatik könnten Sie Detailfragen beantworten?"],
    required: false,
    title: "Theoretische Informatik"
  },
  {
    key: "database_systems",
    type: "multi-select-slider",
	options: [
      { name: "Relationale Datenbanken"},
      { name:"NoSQL Datenbanken"},
      {name:"SQL"},
      {name:"Indexing in Datenbanken"}
	],
    secParagraphArray: ["Zu welchen Themen aus dem Bereich Datenbanken könnten Sie Detailfragen beantworten?"],
    required: false,
    title: "Datenbanken"
  },
  {
    key: "math_logics",
    type: "multi-select-slider",
	  options: [
		{ name: "Boolesche Algebra"},
		{ name:"Aussagenlogik"},
		{name:"Prädikatenlogik"}
	],
    secParagraphArray: ["Zu welchen mathematischen Strukturen und Logiken könnten Sie Detailfragen beantworten?"],
    required: false,
    title: "Logik"
  },
  {
    key: "algorithms",
    type: "multi-select-slider",
	  options: [
		{ name: "Sortieralgorithmen und deren Komplexität"},
		{ name:"Suchbäume"},
		{name:"Suchverfahren (A*, genetisch, evolutionär usw.)"},
		{name:"Algorithmen für Graphen, Hashing"}
	],
    secParagraphArray: ["Zu welchem Thema aus dem Bereich Algorithmen könnten Sie Detailfragen beantworten?"],
    required: false,
    title: "Algorithmen"
  },
  {
    key: "data_structures",
    type: "multi-select-slider",
	  options: [
		{ name: "Arrays und Listen"},
		{ name:"Bäume"},
		{name:"Graphen"},
		{name:"Indexstrukturen"},
		{name:"Hashtabellen"},
		{name:"Maps"}
	],
    secParagraphArray: ["Zu welchen Themen aus dem Bereich Datenstrukturen könnten Sie Detailfragen beantworten?"],
    required: false,
    title: "Datenstrukturen"
  },
  {
    key: "comp_architecture",
    type: "multi-select-slider",
	options: [
		{ name: "Gatter"},
		{ name:"Schaltnetze"},
		{name:"von Neumann Architektur"},
		{name:"Maschinensprache"},
		{name:"Assemblerprogrammierung"}
	],
    secParagraphArray: ["Zu welchen Themen aus dem Bereich Rechnerarchitektur könnten Sie Detailfragen beantworten?"],
    required: false,
    title: "Rechnerarchitektur"
  },
  {
    key: "op_systems",
    type: "multi-select-slider",
	options: [
		{ name: "Prozesse und Threads"},
		{ name:"Deadlocks"},
		{name:"Race Conditions"},
		{name:"virtuelle Speicherverwaltung"},
		{name:"Virtualisierung"}
	],
    secParagraphArray: ["Zu welchen Themen aus dem Bereich Betriebssysteme könnten Sie Detailfragen beantworten?"],
    required: false,
    title: "Betriebssysteme"
  },
  {
    key: "comp_networks",
    type: "multi-select-slider",
	options: [
		{ name: "OSI-Modell"},
		{ name:"IP-Protokolle"},
		{name:"TCP-Protokoll"},
		{name:"Socket Programmierung"},
		{name:"Grundlagen verteilter Systeme"},
		{name:"Kommunikationsmiddleware"}
	],
    secParagraphArray: ["Zu welchen Themen aus dem Bereich Rechnernetze könnten Sie Detailfragen beantworten?"],
    required: false,
    title: "Rechnernetze"
  }
];

const selfEval_others2_formEntries =
[
{
    "key": "digital_media",
    "type": "multi-select-slider",
	options: [
		{ name: "Darstellung von Zeichen und Schrift"},
		{ name:"Audio"},
		{name:"Video"},
		{name:"Kompression"},
		{name:"Skriptsprachen"}
	],
    "secParagraphArray": ["Zu welchen Themen aus dem Bereich Digitale Medien könnten Sie Detailfragen beantworten?"],
    "required": "False",
    "title": "Falls Sie Medieninformatik studieren möchten"
  },
  {
    "key": "media_tech",
    "type": "multi-select-slider",
	options: [
		{ name: "Bildgestaltung"},
		{ name:"Videoproduktion"},
		{name:"GUI-Programmierung"}
	],
    "secParagraphArray": ["Zu welchen Themen aus dem Bereich Medientechnik könnten Sie Detailfragen beantworten?"],
    "required": "False",
    "title": "Falls Sie Medieninformatik studieren möchten"
  },
  {
    "key": "mmi",
    "type": "multi-select-slider",
	options: [
		{ name: "Kognition/Motorik"},
		{ name:"Mentale Modelle"},
		{name:" UI-Gestaltung"},
		{name:"Evaluation"}
	],
    "secParagraphArray": ["Zu welchen Themen aus dem Bereich Mensch-Computer-Interaktion könnten Sie Detailfragen beantworten?"],
    "required": "False",
    "title": "Falls Sie Mensch-Computer-Interaktion studieren möchten"
  }
];

const selfEval_confirm_formEntries =
  [
    {
      key: "selfEval_confirm",
      type: "checkBox",
      options: "",
      title: "Wollen sie eine Selbsteinschätzung abgeben ?",
      secParagraphArray: "",
      defaultValue: "null",
      validators: ['required']

    }
  ]


/*__________________________________________________________________________________________________________________
__________________________________________________________________________________________________________________
*/

export const formList = {
    mainForm : {
        title: "Eignungsfeststellungsverfahren für Masterstudium Informatik und Medieninformatik",                        //not used at the moment
        key: "mainForm_efvmsinf17",                                            //not used at the moment
        site: 'mainForm_efvmsinf17',                                           //not used at the moment
    },
    subForms : [
        {
            title: " Auswahl Masterprogramm",
            key: "sel_master",
            site: 'sel_master',
            formEntries: sel_master_formEntries
        },
        {
            title: "Stammdaten",
            key: "pers_data",
            site: "pers_data",
            formEntries: pers_data_formEntries
        },
        {
            title: "Bisheriger Bildungsgang",
            key: "prev_education",
            site: "prev_education",
            //formObj: this.oi_formObj
            formEntries: prev_education_formEntries
        },
		{
            title: "Neigungen und Interessen ",
            key: "pers_interests",
            site: "pers_interests",
            formEntries: pers_interests_formEntries
        }/*,
		  {
            title: "Selbsteinschätzung",
            key: "self_eval",
            site: "self_eval",
            formEntries: selfEval_confirm_formEntries,
            childrenFormsArray:[
                {
                    title: "Programmierung",
                    key: "subForm_selfEval_programming",
                    formEntries: selfEval_programming_formEntries,
                    site: "self_eval",		//in which site is that form visible (parent), //has to be equal to a subForm key-value
                    noneOwnTab: true,				//indicates that this is a only-childView of an existing subForm-tab ( kind of sub-sub-form)
                    isCollapsible : false
                },
				        {
                    title: "Weitere Kenntnisse",
                    key: "subForm_selfEval_others",
                    formEntries: selfEval_others_formEntries,
                    site: "self_eval",		//in which site is that form visible (parent), //has to be equal to a subForm key-value
                    noneOwnTab: true,				//indicates that this is a only-childView of an existing subForm-tab ( kind of sub-sub-form)
                    isCollapsible : false
                }
            ]

        }*/
    ]
}
