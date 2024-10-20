import { ChangeDetectionStrategy, Component , inject } from '@angular/core';
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

  constructor(private apiservice:ApiService) { }

  ediFormControl = new FormControl('');
  jsonFormControl = new FormControl('');

  details = '';
  dialogDetails = ''
  ranTransaction = false;

  readonly dialog = inject(MatDialog);

  openStatus() {
    console.log(this.dialogDetails);
    const dialogRef = this.dialog.open(DetailsDialogComponent,  {
      data: {
        dialogDetails: this.dialogDetails,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  convert(){
    this.ranTransaction = true;
    if(this.ediFormControl.value){
      this.apiservice.getdata(this.ediFormControl.value).subscribe(data => {
        data.replace("\n", "<br>");
        this.dialogDetails = data;
        console.log('this.dialogDetails --->>> ' + this.dialogDetails);
        this.details = 'Success';
      });
    }
  }
}
