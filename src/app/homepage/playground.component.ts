import { Component } from '@angular/core';

export interface Tile {
  cols: number;
  rows: number;
}

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.scss'
})
export class PlaygroundComponent {
  outerTiles: Tile[] = [
    { cols: 1, rows: 1 },
    { cols: 1, rows: 8 },
    { cols: 1, rows: 1 },
  ];

  inprogress = false;
  checkApiCallStatus($event: any){
    this.inprogress = $event;
  }


}
