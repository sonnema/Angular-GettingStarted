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
  private _listFilter: string;
  errorMessage: string;
  get listFilter(): string {
    return this._listFilter;
  }                
  set listFilter( value: string){
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  } 
  filteredProducts : IProduct[];
  //imageUrl = '../assets/images/garden_cart.png';
  // products : any[] = [
  products : IProduct[] = [];
    constructor(private productService: ProductService) {
      
    }
    performFilter(filterBy: string) : IProduct[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter((product: IProduct) =>
        product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
    toggleImage(): void {
      this.showImage = !this.showImage;
    }
    onRatingClicked(message: string): void {
      this.pageTitle = 'Product List: ' + message;
    }
    ngOnInit(): void {
      // this.listFilter = 'cart';
      this.productService.getProducts().subscribe({
        next: products => {
          this.products = products;
          this.filteredProducts = this.products;
          },
          error: err => this.errorMessage = err
      });
      //this.products = this.productService.getProducts();
      
    }
}
