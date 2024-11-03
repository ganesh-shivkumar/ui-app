import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundComponent } from './playground.component';
import { MatGridListModule} from '@angular/material/grid-list';
import { ConversionSectionComponent } from './conversion-section.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DetailsDialogComponent } from './details-dialog.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatProgressBarModule,
    MatIconModule,
  ],
  declarations: [PlaygroundComponent, ConversionSectionComponent, DetailsDialogComponent, LoginComponent],
  exports : [PlaygroundComponent, ConversionSectionComponent, DetailsDialogComponent, LoginComponent]
})
export class HomepageModule { }
