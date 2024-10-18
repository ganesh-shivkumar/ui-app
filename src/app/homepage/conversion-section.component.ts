import { ChangeDetectionStrategy, Component , inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DetailsDialogComponent } from './details-dialog.component';

@Component({
  selector: 'app-conversion-section',
  templateUrl: './conversion-section.component.html',
  styleUrl: './conversion-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversionSectionComponent {

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
    this.details = 'Analysis is complete and no errors are found!';
  }
}
