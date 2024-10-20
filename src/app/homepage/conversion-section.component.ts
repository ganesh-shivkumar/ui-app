import { ChangeDetectionStrategy, Component , inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DetailsDialogComponent } from './details-dialog.component';
import { ApiService } from './api_service';

export interface EchoMessage {
  title: string;
  message: string;
}

@Component({
  selector: 'app-conversion-section',
  templateUrl: './conversion-section.component.html',
  styleUrl: './conversion-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversionSectionComponent {

  constructor(private apiservice:ApiService) { }

  readonly ediFormControl = new FormControl('', [Validators.required]);
  readonly jsonFormControl = new FormControl('');

  details = '';
  ranTransaction = false;

  readonly dialog = inject(MatDialog);

  openStatus() {
    const dialogRef = this.dialog.open(DetailsDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  convert(){
    this.ranTransaction = true;
    this.apiservice.getdata().subscribe(data => {
      console.log('data --->>> ' + data);
      
      const jsonResponse : EchoMessage= JSON.parse(data)
      console.log('jsonResponse --->>> ' + jsonResponse.message);
      this.details = data.toString();
    });
  }
}
