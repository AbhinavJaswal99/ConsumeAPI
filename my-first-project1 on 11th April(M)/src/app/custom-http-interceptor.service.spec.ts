import { TestBed } from '@angular/core/testing';

import { CustomHttpInterceptorService } from './custom-http-interceptor.service';

describe('CustomHttpInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomHttpInterceptorService = TestBed.get(CustomHttpInterceptorService);
    expect(service).toBeTruthy();
  });
});
