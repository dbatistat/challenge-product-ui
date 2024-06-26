import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  AfterViewInit,
} from '@angular/core'
import { MediaMatcher } from '@angular/cdk/layout'
import { timer } from 'rxjs'
import { Subscription } from 'rxjs'

import { SpinnerService } from '../../core/services/spinner.service'
import { AuthGuard } from '../../core/guards/auth.guard'
import { AuthService } from '../../core/services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {
  private _mobileQueryListener: () => void
  mobileQuery: MediaQueryList
  userName: string = ''

  private autoLogoutSubscription: Subscription = new Subscription()

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    public spinnerService: SpinnerService,
    private authService: AuthService,
    private authGuard: AuthGuard,
    private router: Router,
  ) {
    this.mobileQuery = this.media.matchMedia('(max-width: 1000px)')
    this._mobileQueryListener = () => changeDetectorRef.detectChanges()
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener)
  }

  async ngOnInit(): Promise<void> {
    const user = await this.authService.getCurrentUser()

    this.userName = user.fullname

    // Auto log-out subscription
    const timer$ = timer(2000, 5000)
    this.autoLogoutSubscription = timer$.subscribe(() => {
      this.authGuard.canActivate()
    })
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener)
    this.autoLogoutSubscription.unsubscribe()
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges()
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(['/auth/login'])
  }
}
