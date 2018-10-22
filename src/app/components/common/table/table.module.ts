import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    PaginationComponent
  ],
  declarations: [PaginationComponent]
})
export class TableModule { }
