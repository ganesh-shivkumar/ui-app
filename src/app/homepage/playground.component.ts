import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from './api_service';
import { MatDialog } from '@angular/material/dialog';
import { DetailsDialogComponent } from './details-dialog.component';

export interface Tile {
  cols: number;
  rows: number;
}

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.scss'
})
export class PlaygroundComponent implements OnInit{

  constructor(private apiservice:ApiService) { }
  ngOnInit(): void {
    this.getLatestTunedModel();
  }

  readonly dialog = inject(MatDialog);

  outerTiles: Tile[] = [
    { cols: 1, rows: 1 },
    { cols: 1, rows: 8 },
    { cols: 1, rows: 1 },
  ];

  inprogress = false;
  tunedmodelDetails = '';

  checkApiCallStatus($event: any){
    this.inprogress = $event;
  }

  trainModel(){
    this.inprogress = true;
    this.apiservice.trainData().subscribe(data => {  
      this.inprogress = false;
      this.tunedmodelDetails = data.toString();
      this.openDialog(data.toString())
    });
  }

  openDialog(details : string) {
    const dialogRef = this.dialog.open(DetailsDialogComponent,  {
      data: {
        dialogDetails: details,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getLatestTunedModel(){
    this.inprogress = true;
    this.apiservice.getLatestTunedModel().subscribe(data => {
      this.inprogress = false;
      this.tunedmodelDetails = data.toString();
    })
  }

  

}
