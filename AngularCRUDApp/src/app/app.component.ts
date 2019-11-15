import { Component } from '@angular/core';
import { SlimLoadingBarService } from '@cime/ngx-slim-loading-bar';
import { NavigationCancel,
         Event,
         NavigationEnd,
         NavigationStart,
         Router, 
         NavigationError} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularCRUDApp';

  constructor(private _loadingbar: SlimLoadingBarService, private _router: Router){
    this._router.events.subscribe((event: Event) => {
      this.NavigationInterceptor(event);
    });
  }

  private NavigationInterceptor(event: Event):void {
    if(event instanceof NavigationStart){
      this._loadingbar.start();
    }
    if(event instanceof NavigationEnd){
      this._loadingbar.stop();
    }
    if(event instanceof NavigationCancel){
      this._loadingbar.stop();
    }
    if(event instanceof NavigationError){
      this._loadingbar.stop();
    }
  }

}
