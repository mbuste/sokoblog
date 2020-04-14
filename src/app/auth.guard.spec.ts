import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service'

describe('AuthGuard', () => {
  let guard: AuthGuard, service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
    guard = TestBed.inject(AuthGuard);
    service = TestBed.get(AuthService)
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
