import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssueAnalyzerComponent } from './issue-analyzer.component';

describe('IssueAnalyzerComponent', () => {
  let component: IssueAnalyzerComponent;
  let fixture: ComponentFixture<IssueAnalyzerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueAnalyzerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueAnalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
});
