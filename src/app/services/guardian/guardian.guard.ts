import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const guardianGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const isLoggedIn = authService.isAuthenticated();
  
  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
