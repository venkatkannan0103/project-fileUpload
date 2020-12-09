import { NgModule } from '@angular/core';
import { CdkColumnDef, CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { IssueAnalyzerComponent } from './issue-analyzer/issue-analyzer.component';
import { MaterialModule } from '../shared/module/material.module';
import { ScreensRoutingModule } from './screens-routing.module';

@NgModule({
  declarations: [IssueAnalyzerComponent],
  imports: [
    CdkTableModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    ScreensRoutingModule
  ],
  exports: [
    CdkTableModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule
  ],
  providers: [
    CdkColumnDef
  ]
})
export class ScreensModule { }
