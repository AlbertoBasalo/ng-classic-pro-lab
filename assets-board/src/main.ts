import { provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routing';
import { AssetsEffects } from './app/shared/assets/assets-effects.service';

function initEffects(assetsEffects: AssetsEffects) {
  return ()=>assetsEffects.configForRoot()
}

bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(APP_ROUTES),
      provideHttpClient(),
      { 
        provide: APP_INITIALIZER, 
        useFactory: initEffects, 
        deps: [AssetsEffects], 
        multi: true
      }    
    ]
})
  .catch(err => console.error(err));


