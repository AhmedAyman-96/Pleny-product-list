import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly BASE_URL = 'https://dummyjson.com/auth/login';
  private tokenKey = 'authToken';
  private authStatusSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  public authStatus$ = this.authStatusSubject.asObservable();

  constructor(private router: Router, private http: HttpClient) { }

  authinticateUser(credentials: any) {
    return this.http.post(this.BASE_URL, credentials);
  }


  login(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.authStatusSubject.next(true); // Update the auth status
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.authStatusSubject.next(false); // Update the auth status
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
