import { Pipe, PipeTransform } from '@angular/core';
import { fadeInItems } from '@angular/material';

@Pipe({
  name: 'myfilter',
  pure :false
})
export class MyfilterPipe implements PipeTransform {
  transform(items: any[], value: string, label:string): any[] {
    if (!items) return [];
    if (!value) return  items;
    if (value == '' || value == null) return [];
    return items.filter(e => e[label].toLowerCase().indexOf(value) > -1 );
    
  }
  // transform(value: any, args?: any): any {


  //     if(!args){
  //       return value;
  //     }
  //     else{
  //       args=args.toUpperCase();
  //     }//username

  //     return value.filter(items=>{
  //             return  items.username.startsWith(args)==true

  //     })
      
  // }

}
