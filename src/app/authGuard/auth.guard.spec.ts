import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../Services/authService/auth.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow activation if the user is logged in', () => {
    authService.isLoggedIn.and.returnValue(true); // Mock user is logged in

    const result = authGuard.canActivate();

    expect(result).toBeTrue();
    expect(authService.isLoggedIn).toHaveBeenCalled();
  });

  it('should deny activation and navigate to login if the user is not logged in', () => {
    authService.isLoggedIn.and.returnValue(false); // Mock user is not logged in

    const result = authGuard.canActivate();

    expect(result).toBeFalse();
    expect(authService.isLoggedIn).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/authentication/login']);
  });
});
