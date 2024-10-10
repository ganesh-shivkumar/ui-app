import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundComponent } from './playground.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { ConversionSectionComponent } from './conversion-section.component';

@NgModule({
  imports: [
    CommonModule, MatGridListModule
  ],
  declarations: [PlaygroundComponent, ConversionSectionComponent],
  exports : [PlaygroundComponent, ConversionSectionComponent]
})
export class HomepageModule { }
