import { Component, Input } from '@angular/core';
import { Filters, SpacexDetails } from '../models/spaceX-model';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
})
export class DataGridComponent  {
  @Input() launchList: SpacexDetails[];
}


