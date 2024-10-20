import { ChangeDetectionStrategy, Component , EventEmitter, inject, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DetailsDialogComponent } from './details-dialog.component';
import { ApiService } from './api_service';

export interface DialogData  {
  dialogDetails: string;
}

@Component({
  selector: 'app-conversion-section',
  templateUrl: './conversion-section.component.html',
  styleUrl: './conversion-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversionSectionComponent {

  @Output() childComponentValue = new EventEmitter<any>();

  constructor(private apiservice:ApiService) { }

  ediFormControl = new FormControl('');
  jsonFormControl = new FormControl('');

  details = '';
  dialogDetails = ''
  ranTransaction = false;

  readonly dialog = inject(MatDialog);

  openStatus() {
    const dialogRef = this.dialog.open(DetailsDialogComponent,  {
      data: {
        dialogDetails: this.dialogDetails,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  sendToParent(value : boolean) {
    this.childComponentValue.emit(value);
  }


  convert(){
    this.ranTransaction = true;
    if(this.ediFormControl.value){
      this.sendToParent(true);
      this.apiservice.getdata(this.ediFormControl.value).subscribe(data => {  
        this.dialogDetails = data.replace(/\"```json/g,"");
        this.dialogDetails = this.dialogDetails.replace(/```\"/g,"");
        this.dialogDetails = this.dialogDetails.replace(/\\/g,"");
        this.details = 'Success';
        this.sendToParent(false);
      });
    }
  }
}
