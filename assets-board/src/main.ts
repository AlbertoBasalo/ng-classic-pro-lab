import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { AssetsEffects } from './app/shared/assets/assets-effects.service';

function initEffects(assetsEffects: AssetsEffects) {
  return ()=>assetsEffects.configForRoot()
}

bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(BrowserModule, AppRoutingModule),
      { 
        provide: APP_INITIALIZER, 
        useFactory: initEffects, 
        deps: [AssetsEffects], 
        multi: true
      }    
    ]
})
  .catch(err => console.error(err));


