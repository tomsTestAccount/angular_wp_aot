
import {Component, OnInit, Input } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import {setTimeout} from "timers";


const dbgPrint = false;
const dbgPrint_grid_prio_list = true;



class listItem{
  name:string;
  pos:number;
  isSelected:boolean;
}


interface iListItem { name:string,pos:number,isSelected:boolean};

@Component({
  //moduleId: module.id,
  selector: 'rt-mselect-prio-grid',
  templateUrl: 'rt-mselect-prio-grid.component.html',
  styleUrls: ['rtForm.css']
  //template:html,
  //styles:[css]
})
export class rtMSelectPrioGridComponent implements OnInit
{

  @Input() formEntry : any;

  @Input() formgroup: FormGroup;

  @Input() usePrio: boolean;

  newAddObj : object ;

  gridOptions : any;

  averageCalculated = 0.0;
  avrgValueDisplayed : string;           //a string is used because of different display of floating point number in different countries  problems of browser

  setObj : any ;

  isValValid = false;
  differ:any;
  //----------------------------------------------------

  optionsMap = [];
  lastSelectedPos  : number;


  constructor() {
  }

  ngOnInit(): void {


    this.gridOptions = this.formEntry.gridOptions;

    //fill map with selectable options
    this.formEntry.options.forEach((listEntry,i) => {

      listEntry['isSelected'] = false;
      listEntry['pos'] = this.formEntry.options.length-1;
      this.optionsMap[i] = listEntry;

    });

    //mark selectable options as checked and order list regarding given defaultValue
    if (this.formEntry.defaultValue !== undefined && this.formEntry.defaultValue !== null) {
      for (let i = 0; i < this.formEntry.defaultValue.length; i++) {
        var value2search = this.formEntry.defaultValue[i];
        for (let z = 0; z < this.optionsMap.length; z++) {
          let str = this.optionsMap[z].name;
          if (value2search === str) {
            this.optionsMap[z].isSelected = true;
            this.optionsMap[z].pos = i;
            this.lastSelectedPos = i;
          }
        }
      }
    }

    if (dbgPrint_grid_prio_list) console.log("In rtMSelectPrioGridComponent , this.formEntry=",this.formEntry);
    if (dbgPrint_grid_prio_list) console.log("In rtMSelectPrioGridComponent , this.optionsMap=",this.optionsMap);


  }

  //---------------------------------------------------

  toogleSlider(item:listItem)
  {
    setTimeout(()=> {

      item.isSelected = !item.isSelected;

      if (!item.isSelected) {
        let setPos = this.optionsMap.length-1;
        //if (this.lastSelectedPos+1<setPos) setPos = this.lastSelectedPos+1;
        item.pos = setPos;
      }
      else {
        let setPos = this.lastSelectedPos+1;
        if (setPos>=this.optionsMap.length-1) setPos = this.optionsMap.length-1;
        //this.lastSelectedPos = setPos;
        //item.pos = this.lastSelectedPos;
        item.pos = setPos;
      }

      this.optionsMap.sort(function(a,b){
        if (!a.isSelected) return 1;
        else if (!b.isSelected) return -1;
        else return a.pos-b.pos;
      });

      for (let i=0;i<this.optionsMap.length;i++) {
        let o = this.optionsMap[i];
        //console.log("o=",o);
        o.pos = i;
        if(o.isSelected === true) this.lastSelectedPos = o.pos;
      }


      //console.log("this.optionsMap=",this.optionsMap, " this.lastSelectedPos=", this.lastSelectedPos);

      this.setFormControlValue();
    },5);
  };

  prioUp(item:listItem)
  {
    if (item.pos>0)
    {
      setTimeout(()=> {
        this.optionsMap.forEach((listEntry,i) => {if (listEntry.pos== (item.pos - 1)) listEntry.pos++;});
        item.pos = item.pos - 1;
        this.setFormControlValue();
      },5);
    }

  };

  prioDown(item:listItem)
  {
    if (item.pos<this.optionsMap.length)
    {
      setTimeout(()=> {
        this.optionsMap.forEach((listEntry,i) => {if (listEntry.pos==(item.pos + 1)) listEntry.pos--;});
        item.pos = item.pos + 1;
        this.setFormControlValue();
      },5);
    }
  };



  setFormControlValue() {
    //let setObjReally = setObject;
    setTimeout(() => {

      //if (setObject.table.length == 0) this.formgroup.controls[this.formEntry.key].setValue(null);
      //else

      this.optionsMap = this.optionsMap.sort(function(a,b){return a.pos-b.pos});

      let tmpArray = [];

      //this.optionsMap.forEach((listEntry,i) => {tmpArray[i] = listEntry.name });
      var z = 0;
      for (let i = 0;i<this.optionsMap.length;i++)
      {
        if (this.optionsMap[i].isSelected == true)
        {
          tmpArray[z] = this.optionsMap[i].name;
          z++;
        }

      }

      //if (tmpArray.length == 0) tmpArray = null;

      this.formgroup.controls[this.formEntry.key].setValue(tmpArray);

      this.formgroup.controls[this.formEntry.key].markAsDirty();

      if (dbgPrint) console.log("this.formEntry for ",this.formEntry.key," =",(<FormControl>this.formgroup.controls[this.formEntry.key].value)); //this.setObj.courses;

    },15);
  }



}
