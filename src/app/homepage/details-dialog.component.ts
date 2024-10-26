import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrl: './details-dialog.component.scss'
})
export class DetailsDialogComponent {
  data = inject(MAT_DIALOG_DATA);


  openDialog(){
    
  }
}
