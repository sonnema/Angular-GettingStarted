import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, ObservableInput } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn : 'root'
})
export class ProductService{
    private productUrl : 'api/products/products.json';
    //handleError: (err: any, caught: Observable<IProduct[]>) => ObservableInput<any>;
    constructor (private http: HttpClient) { }
    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl)
        .pipe(
            tap(data=>console.log('All:' + JSON.stringify(data))),
            catchError(this.handleError)
        );    
    }
    

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if(err.error instanceof ErrorEvent){
            errorMessage = `An error occured : ${err.error.message}`;
        }
        else{
            errorMessage = `Server returned error ${err.status},error message is ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }    

}