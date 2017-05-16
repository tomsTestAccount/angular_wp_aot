import { Pipe, PipeTransform } from '@angular/core';
/*
 * Pipe for iterate over dictionary-like object-map
 * (for using *ngFor like in ng1 )
 * <div *ngFor="#keyValuePair of dict | keyValue">
 *      This is the key {{keyValuePair.key}} and this is the value {{keyValuePair.val}} !
 * </div>
 */

/*
@Pipe({
    name: 'getKeyValuePair'
})
export class getKeyValuePair {
    transform(dict: Object): Array<Object> {
        var a = [];
        for (var key in dict) {
            if (dict.hasOwnProperty(key)) {
                a.push({key: key, val: dict[key]});
            }
        }
        return a;
    }
}
*/

@Pipe({ name: 'objValuesPipe',  pure: false })
export class objValuesPipe implements PipeTransform {
    transform(value: any, args: any[] = null): any {
        return Object.keys(value).map(key => value[key]);
    }
}


@Pipe({name: 'orderBy', pure: false})
export class orderByPipe implements PipeTransform {


  static _orderByComparator(a: any, b: any): number {

    if ((typeof(a) === "boolean")) {
      //console.log("a = ",a);
      if (a > b ) return -1;
      if (a <= b ) return 1;
    }
    else if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
      //Isn't a number so lowercase the string to properly compare
      if (a.toLowerCase() < b.toLowerCase()) return -1;
      if (a.toLowerCase() > b.toLowerCase()) return 1;
    }
    else {
      //Parse strings as numbers to compare properly
      if (parseFloat(a) < parseFloat(b)) return -1;
      if (parseFloat(a) >= parseFloat(b)) return 1;
    }

    //return 0; //equal each other
  }


  //transform(input: any, [config = '+']): any {
  transform(input: any, config:string): any {

    //let config = ;
    //console.log("config = ",config);

    if (!Array.isArray(input)) return input;

    if (!Array.isArray(config) || (Array.isArray(config) && config.length == 1)) {
      var propertyToCheck: string = !Array.isArray(config) ? config : config[0];
      var desc = propertyToCheck.substr(0, 1) == '-';

      //Basic array
      if (!propertyToCheck || propertyToCheck == '-' || propertyToCheck == '+') {
        return !desc ? input.sort() : input.sort().reverse();
      }
      else {
        var property: string = propertyToCheck.substr(0, 1) == '+' || propertyToCheck.substr(0, 1) == '-'
          ? propertyToCheck.substr(1)
          : propertyToCheck;


        return input.sort(function (a: any, b: any) {
          //console.log("a = ",a,",b = ",b, "propertyToCheck = ",propertyToCheck);
          return !desc
              ? orderByPipe._orderByComparator(a[property], b[property])
              : -orderByPipe._orderByComparator(a[property], b[property]);
        });
      }
    }
    else {
      //Loop over property of the array in order and sort
      return input.sort(function (a: any, b: any) {
        for (var i: number = 0; i < config.length; i++) {
          var desc = config[i].substr(0, 1) == '-';
          var property = config[i].substr(0, 1) == '+' || config[i].substr(0, 1) == '-'
            ? config[i].substr(1)
            : config[i];

          //console.log("a = ",a,",b = ",b, "propertyToCheck = ",property);

          var comparison = !desc
              ? orderByPipe._orderByComparator(a[property], b[property])
              : -orderByPipe._orderByComparator(a[property], b[property]);



          //Don't return 0 yet in case of needing to sort by next property
          if (comparison != 0) return comparison;
        }

        return 0; //equal each other
      });
    }
  }
}


/*
@Pipe({ name: 'subFormEntryPipe',  pure: false })
export class subFormEntryPipe implements PipeTransform {
    transform(value: any, args: any[] = null): any {

        if (Object.prototype.toString.call(value) === '[object Array]')
        {

            for (let i=0;i<value.length;i++)
            {
                if (value[i].embedded)
                {
                    value.splice(i, 1);
                }

            }
            //console.log("value=",value);

            return value;
        }
        //return value;
    }
}
    */
