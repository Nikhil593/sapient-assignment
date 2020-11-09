import { CommonModule} from '@angular/common';
import { NgModule} from '@angular/core';
import { DataFilterComponent } from '../data-filter/data-filter.component';
import { DataGridComponent } from '../data-grid/data-grid.component';
import { HomeRoutingModule} from './home-routing.module';
import { HomeComponent} from './home.component'


@NgModule({
    declarations: [HomeComponent, DataFilterComponent,DataGridComponent],
    imports:[CommonModule,HomeRoutingModule]
})
export class HomeModule {}