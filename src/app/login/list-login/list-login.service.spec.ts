import { TestBed } from '@angular/core/testing';

import { ListLoginService } from './list-login.service';

describe('ListLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListLoginService = TestBed.get(ListLoginService);
    expect(service).toBeTruthy();
  });
});
