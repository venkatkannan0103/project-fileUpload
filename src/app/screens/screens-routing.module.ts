import { NgModule } from '@angular/core';
import { IssueAnalyzerComponent } from './issue-analyzer/issue-analyzer.component';
import { Routes, RouterModule } from '@angular/router';
import { ScreensComponent } from './screens.component';

const routes: Routes = [
  {
    path: '',
    component: ScreensComponent,
    children: [
      { path: 'issue-analyzer', component: IssueAnalyzerComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScreensRoutingModule { }
