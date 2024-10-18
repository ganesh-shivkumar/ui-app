import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-conversion-section',
  templateUrl: './conversion-section.component.html',
  styleUrl: './conversion-section.component.scss'
})
export class ConversionSectionComponent {

  readonly ediFormControl = new FormControl('', [Validators.required]);
  readonly jsonFormControl = new FormControl('');
}
