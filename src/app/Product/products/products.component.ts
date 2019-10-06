import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../product';

@Component({
    selector: "app-products",
    templateUrl: "./products.component.html",
    styleUrls: ["./products.component.css"],
    //providers: [ProductService]
})
export class ProductsComponent implements OnInit {
    pageTitle: string = "Product List";
    imageWidth = 50;
    imageMargin = 2;
    showImage: boolean = false;
    _filterKeyWord: string;

    get filterKeyWord() {
        return this._filterKeyWord;
    }

    set filterKeyWord(value: string) {
        this._filterKeyWord = value;
        this.filterProduct = this.filterKeyWord ? this.performFilter(this.filterKeyWord) : this.products;
    }

    filterProduct: IProduct[];
    products: IProduct[];
    constructor(private productService: ProductService) {

    }
    toggleImage() {
        this.showImage = !this.showImage;
    }
    ngOnInit() {
        this.productService.getProducts().subscribe({
            next: products => {
                this.products = products
                this.filterProduct = this.products;
            },
            error: err => { console.log(err); }
        });

    }
    performFilter(filterBy: string) {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((item: IProduct) =>
            item.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    getNotified(event) {
        alert(event);
    }
}