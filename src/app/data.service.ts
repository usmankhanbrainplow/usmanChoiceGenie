import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SimpleGlobal } from 'ng2-simple-global';

@Injectable()
export class DataService {
  private sg: SimpleGlobal
  private productsSource;
  private zipcodesearch;
  zipcodeSubject = new BehaviorSubject<any>('');
  currentProducts;
  constructor() {
    // this.sg['products'] = []
    
    // if ('products' in this.sg) {
      this.productsSource = new BehaviorSubject<any>(localStorage.getItem('products'));
      this.zipcodesearch = new BehaviorSubject<any>(localStorage.getItem('zip'));
      this.currentProducts = this.productsSource.asObservable();
    // }
    // else {
    //   // this.sg['products'] = []
    //   this.currentProducts = this.productsSource.asObservable();



    // }
  }
  returnZipcode(){
    return this.zipcodeSubject;
  }
  zipcodeInfo(data){
    this.zipcodeSubject.next(data);
  }
  changeProducts(products: any) {
    this.productsSource.next(products)
  }
  changezip(zip: any) {
    this.zipcodesearch.next(zip)
  }


}
