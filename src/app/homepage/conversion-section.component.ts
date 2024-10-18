import { ChangeDetectionStrategy, Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

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

  convert(){
    this.ranTransaction = true;
    this.details = 'Analysis is complete and no errors are found!';
  }

  openStatus(){
    this.details = "Opens!";
  }
}
