import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './components/star.component';
import { FormsModule } from '@angular/forms';
import { ConvertTOSpacesPipe } from './convert-to-spaces.pipe';



@NgModule({
  declarations: [
    StartComponent,
    ConvertTOSpacesPipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    StartComponent,
    ConvertTOSpacesPipe
  ]
})
export class SharedModule { }
