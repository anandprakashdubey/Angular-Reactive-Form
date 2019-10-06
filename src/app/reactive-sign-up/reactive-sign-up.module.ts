import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveSignUpComponent } from './reactive-sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        ReactiveSignUpComponent,
    ],
    imports: [
        RouterModule.forChild([
            { path: 'reactiveFormBasedSignUp', component: ReactiveSignUpComponent },
        ]),
        SharedModule,
        ReactiveFormsModule,
    ],
})
export class ReactiveFormSignUpModule { }
