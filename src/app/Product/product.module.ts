import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductDetailsGuardGuard } from '../Guards/product-details-guard.guard';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductEditGuard } from '../Guards/product-edit.guard';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from '../services/product-data';
//import { ProductData } from './product-data';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailsComponent,  
    ProductEditComponent,   
  ],
  imports: [
    RouterModule.forChild([
      { path: 'products', component: ProductsComponent },
     { path: 'products/:id', component: ProductDetailsComponent, canActivate: [ProductDetailsGuardGuard] },
     {
      path: 'products/:id/edit',
      canDeactivate: [ProductEditGuard],
      component: ProductEditComponent
    }
    ]),
    SharedModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(ProductData),
  ]
})
export class ProductModule { }
