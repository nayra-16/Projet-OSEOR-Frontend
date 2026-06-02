import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError, retry } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    retry(1), // Réessayer une fois avant d'échouer
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Une erreur inconnue est survenue';
      
      if (error.status === 0) {
        // Erreur de connexion (Backend injoignable)
        errorMessage = 'Le serveur backend est indisponible. Veuillez vérifier votre connexion ou réessayer plus tard.';
      } else if (error.error instanceof ErrorEvent) {
        // Erreur côté client
        errorMessage = `Erreur: ${error.error.message}`;
      } else {
        // Erreur côté serveur
        errorMessage = `Code d'erreur: ${error.status}\nMessage: ${error.message}`;
      }
      
      // On ne loggue en rouge que si ce n'est pas une erreur de connexion attendue (pour garder la console propre)
      if (error.status !== 0) {
        console.error(errorMessage);
      } else {
        console.warn('Backend connection failed: ', error.message);
      }
      
      return throwError(() => new Error(errorMessage));
    })
  );
};
