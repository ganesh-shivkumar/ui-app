import { ChangeDetectionStrategy, Component , EventEmitter, inject, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
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
      this.apiservice.getData(this.ediFormControl.value).subscribe(data => {  
        this.dialogDetails = data.toString();

        let json = data.toString();
        if(json.includes('```json')){
          json = json.replace(/```json/g,"");
          json = json.substring(0, json.indexOf("```"));
        }
        this.jsonFormControl.setValue(json);


        this.details = 'Completed!';
        this.sendToParent(false);
      });
    }
  }
}
