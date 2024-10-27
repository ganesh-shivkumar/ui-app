import { ChangeDetectionStrategy, ChangeDetectorRef, Component , EventEmitter, inject, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DetailsDialogComponent } from './details-dialog.component';
import { ApiService } from './api_service';

export interface DialogData  {
  dialogDetails: string;
}

export interface ChatCard {
  question: boolean;
  details: string | null; 
}

@Component({
  selector: 'app-conversion-section',
  templateUrl: './conversion-section.component.html',
  styleUrl: './conversion-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversionSectionComponent {

  @Output() childComponentValue = new EventEmitter<any>();

  constructor(private apiservice:ApiService, private changeDetectorRef : ChangeDetectorRef) { }

  ediFormControl = new FormControl('');
  jsonFormControl = new FormControl('');
  chatInputFormControl = new FormControl('');

  details = '';
  dialogDetails = ''
  ranTransaction = false;

  readonly dialog = inject(MatDialog);

  results : ChatCard[] = [];

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

  callGemini(){
    this.sendToParent(true);

    const qEntry : ChatCard = {
      question: true,
      details:  'Q : ' + this.chatInputFormControl.value
    }
    this.results.push(qEntry);

    const geminiPayloads = {
      "edi" : this.ediFormControl.value,
      "json" : this.jsonFormControl.value,
      "input" : this.chatInputFormControl.value
    }
    this.apiservice.callGemini(JSON.stringify(geminiPayloads)).subscribe(data => {
      const aEntry : ChatCard = {
        question: false,
        details:  data.toString()
      }
      this.results.push(aEntry);
      this.chatInputFormControl.setValue('');
      this.changeDetectorRef.detectChanges();
      this.sendToParent(false);
    })
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
