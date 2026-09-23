import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoaderService } from 'src/app/shared/services/progress-bar-loader/loader.service';

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {

constructor(public loaderService:LoaderService){

}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    this.loaderService.isLoading.next(true);
    req = req.clone({ url: environment.baseURL + req.url });
    // req = req.clone({ url: 'https://api.getbiz.app/' + req.url });
    return next.handle(req).pipe(
      finalize(()=>{
        this.loaderService.isLoading.next(false);
      })
    );
  }
}
