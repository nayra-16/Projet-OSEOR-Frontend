import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User, AuthenticationResponse } from '../models/admin.models';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const savedUser = localStorage.getItem('oseor_admin_user');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(email: string, password: string) {
    return this.http.post<AuthenticationResponse>(
      'http://localhost:8080/api/auth/login',
      {
        email: email,
        password: password
      }
    ).pipe(
      tap(response => {
        const user: User = {
          email: response.email,
          role: response.role,
          token: response.token
        };
        localStorage.setItem('oseor_admin_user', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  logout() {
    localStorage.removeItem('oseor_admin_user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/admin/login']);
  }

  getToken(): string | null {
    const user = this.currentUserSubject.value;
    return user ? user.token || null : null;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
}
