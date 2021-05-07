import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/catch';
// import { of } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService, private router: Router) {}

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    debugger;
    // handle your auth error or rethrow
    if (err.status === 401 || err.status === 403) {
        // navigate /delete cookies or whatever
        this.router.navigateByUrl(`/login`);
        // return Observable.of(err.message);
    }
    return Observable.throw(err);
}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });

    return next.handle(request);
  }
}
