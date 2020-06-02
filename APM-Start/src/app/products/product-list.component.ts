import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls:['./product-list.component.css']
})
export class ProductListComponent 
                implements OnInit{
  pageTitle : string = 'Product List';
  imageWidth : number = 50;
  imageMargin : number = 2;
  showImage: boolean = false;
  private _listFilter: string;
  errorMessage: string;
  products : IProduct[] = [];
  filteredProducts : IProduct[] = [];
  get listFilter(): string {
    console.log("Inside get listFilter " + this._listFilter);
    return this._listFilter;
  }                
  set listFilter( value: string){
    console.log("Inside set listFilter ");
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  } 
  constructor(private productService: ProductService) {
    console.log("constructor");
  }
  performFilter(filterBy: string) : IProduct[] {
      console.log("inside performFilter");
      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  
  onRatingClicked(message: string): void {
      this.pageTitle = 'Product List: ' + message;
  }
  toggleImage(): void {
    this.showImage = !this.showImage;
  }
  ngOnInit(): void {
      console.log("inside ngOnInit()");
      this.productService.getProducts().subscribe({
        next:products=>{
          this.products = products;
          this.filteredProducts = this.products;
        },
        error:err=>this.errorMessage = err
      });
      
  }
}
