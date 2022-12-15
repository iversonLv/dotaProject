import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralService } from './general.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(
    public generalServices: GeneralService
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.generalServices.isLoading.next(true);
    return next.handle(req).pipe(
      finalize(() => {
        this.generalServices.isLoading.next(false);
      })
    );
  }
}
