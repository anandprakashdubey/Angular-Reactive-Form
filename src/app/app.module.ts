import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { ProductModule } from './Product/product.module';
import { SignUpModule } from './signup/signup.module';
import { ReactiveFormSignUpModule } from './reactive-sign-up/reactive-sign-up.module';

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'welcome', component: HomeComponent },      
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
    ]),
    ProductModule,
    SignUpModule,
    ReactiveFormSignUpModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
