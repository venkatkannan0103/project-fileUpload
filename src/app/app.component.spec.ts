import { NgModuleFactoryLoader } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location} from '@angular/common'
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ScreensModule } from './screens/screens.module';


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should navigate to screens child path', fakeAsync(() => {
    let router = TestBed.get(Router);
    let location = TestBed.get(Location);
    let fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  
    const loader = TestBed.get(NgModuleFactoryLoader);
    loader.stubbedModules = {lazyModule: ScreensModule};
  
    router.resetConfig([
      {path: 'screens', loadChildren: 'lazyModule'},
    ]);
  
    router.navigateByUrl('/screens/issue-analyzer');
  
    tick();
    fixture.detectChanges();
  
    expect(location.path()).toBe('/screens/issue-analyzer');
  }));
});
