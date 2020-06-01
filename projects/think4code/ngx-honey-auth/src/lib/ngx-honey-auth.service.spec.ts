import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, inject, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { NgxHoneyAuthService } from './ngx-honey-auth.service';
import { AuthConfig } from './ngx-honey.types';

describe('NgxHoneyAuthService', () => {
  let service: NgxHoneyAuthService;

  beforeEach(() => {
    TestBed.resetTestEnvironment();

    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );

    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [
        NgxHoneyAuthService
      ]
    });
    service = TestBed.inject(NgxHoneyAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
