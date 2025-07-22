import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    // App component removed from declarations since it's standalone
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    App // Import the standalone App component instead
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }
