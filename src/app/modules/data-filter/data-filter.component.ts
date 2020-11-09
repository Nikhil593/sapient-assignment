import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { LANDING, LAUNCH, YEARS } from 'src/utils/constant';
import { Filters } from '../models/spaceX-model';

@Component({
  selector: 'app-data-filter',
  templateUrl: './data-filter.component.html',
  styleUrls: ['./data-filter.component.scss'],
})
export class DataFilterComponent implements OnInit {
  @Input() appliedYear: number;
  @Input() isLaunched: string;
  @Input() isLanded: string;
  @Output() applyFilters = new EventEmitter();

  years: Array<Filters>;
  launchValues: Array<Filters>;
  landingValues: Array<Filters>;

  constructor() {}

  /**
   * Getting all Static values to the component.
   */
  ngOnInit() {
    this.launchValues = LAUNCH;
    this.landingValues = LANDING;
    this.years = YEARS;
  }

  /**
   * Select/deselect year filters.
   * @param selectedYear Selected year with the year and selection status.
   */
  applyFilter(field: string, selectedYear: Filters, propertyName: string) {
    this.genericMap(field, selectedYear);
    this.applyFilters.emit({
      propertyName: propertyName,
      selection: selectedYear,
    });
  }

  /**
   * Mapping the selection status for years/launch/landing.
   * @param field             Component property to access(dynamic).
   * @param selectedProperty  That particular selection property.
   */
  genericMap(field: string, selectedProperty: any) {
    this[field].map((property) => {
      property.isSelected =
        property.value === selectedProperty.value
          ? !property.isSelected
          : false;
    });
  }
}
