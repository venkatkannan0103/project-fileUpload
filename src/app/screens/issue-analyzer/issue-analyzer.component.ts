import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import FileUploadUtils from 'src/app/shared/utils/fileUpload.util';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Papa } from 'ngx-papaparse';
import { UserData } from 'src/app/shared/models/issueAnalyzer.model';


@Component({
  selector: 'app-issue-analyzer',
  templateUrl: './issue-analyzer.component.html',
  styleUrls: ['./issue-analyzer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IssueAnalyzerComponent {
  public closeIcon = './assets/Images/error.svg';
  public dataSource: MatTableDataSource<UserData>;
  private data = [];
  public displayedColumns: string[] = ['firstName', 'surName', 'issueCount', 'dateOfBirth'];
  public fileData: string;
  public fileName: string;
  public fileSize: string;
  public filter: string;
  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = value;
    }
  }
  @ViewChild(MatSort, { static: false })
  set sort(value: MatSort) {
    if (this.dataSource) {
      this.dataSource.sort = value;
    }
  }

  constructor(private _fileConverter: Papa, private _cdr: ChangeDetectorRef) { }

  //To upload file & Read it as a text format
  public fileUpload(e): void {
    this.onClear();
    const file = e.target.files[0];
    this.fileName = file.name;
    this.fileSize = FileUploadUtils.formatBytes(file.size);
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event: any) => {
      const csv = event.target.result;
      this._fileConverter.parse(csv, {
        skipEmptyLines: true,
        header: true,
        complete: (results) => {
          this._fileData(results);
        }
      });
    };
  }

  //To Read the text data & convert it to a expected Datasource format
  private _fileData(results): void {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < results.data.length; i++) {
      const userData: UserData = {
        dateOfBirth: results.data[i]['Date of birth'],
        firstName: results.data[i]['First name'],
        issueCount: results.data[i]['Issue count'],
        surName: results.data[i]['Sur name'],
      };
      if (userData.dateOfBirth != null || userData.firstName != null ||
        userData.issueCount != null || userData.surName != null) {
        this.data.push(userData);
      }
    }
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this._cdr.markForCheck();
  }

  //To filter the DataTable based on the Issuecount value
  public applyFilter(filterValue: string): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.filterPredicate = (data, filter: string): boolean => data.issueCount.toString() === filter;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this._cdr.markForCheck();
  }

  //To clear the uploaded file with relevant data
  public onClear(): void {
    this.fileData = '';
    this.fileName = '';
    this.fileSize = '';
    this.data = [];
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.filter = '';
    this.filter = '';
    this._cdr.markForCheck();
  }

}

