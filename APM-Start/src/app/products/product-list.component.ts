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
  //listFilter: string = 'cart';
  private _listFilter: string = '';
  errorMessage: string = '';
  get listFilter(): string {
    console.log("Inside get listFilter " + this._listFilter);
    return this._listFilter;
  }                
  set listFilter( value: string){
    console.log("Inside set listFilter ");
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  } 
  filteredProducts : IProduct[] = [];
  //imageUrl = '../assets/images/garden_cart.png';
  // products : any[] = [
  products : IProduct[] = [];
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
      // this.listFilter = 'cart';
      this.productService.getProducts().subscribe({
      next: products => {
        console.log("Products : " + products);
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
    //this.products = this.productService.getProducts();
  }
}
