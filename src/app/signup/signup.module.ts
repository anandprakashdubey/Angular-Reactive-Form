import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SignupComponent } from './signup.component';

@NgModule({
    declarations: [
        SignupComponent
    ],
    imports: [
        RouterModule.forChild([
            { path: 'formBasedSignUp', component: SignupComponent },
        ]),
        SharedModule,
    ],
})
export class SignUpModule { }
