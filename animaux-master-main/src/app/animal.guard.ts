import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './services/auth.service';

export const animalGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAdmin()) {
    return true; // Allow route activation if the user is an admin
  } else {
    return router.parseUrl('app-forbidden'); // Redirect to forbidden page if not an admin
  }
};