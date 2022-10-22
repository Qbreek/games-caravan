import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListOfDealsTableComponent } from './components/list-of-deals-table/list-of-deals-table/list-of-deals-table.component';
import { ListOfDealsWrapperComponent } from './components/list-of-deals-wrapper/list-of-deals-wrapper.component';
import { PaginatorComponent } from './components/paginator/paginator.component';

import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@NgModule({
  declarations: [
    ListOfDealsTableComponent,
    ListOfDealsWrapperComponent,
    PaginatorComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    PaginatorModule,
    TooltipModule,
    ProgressSpinnerModule,
    OverlayPanelModule,
  ],
  exports: [ListOfDealsWrapperComponent],
})
export class ListOfDealsModule {}
