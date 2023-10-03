import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHouseCircleCheck } from '@fortawesome/free-solid-svg-icons';

import { HomeComponent } from './home/home.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        FontAwesomeModule,
        HomeComponent,
        RouterModule
    ],
    template: `
        <main>
            <a [routerLink]="['/']">
                <header class="pageHeader">
                    <fa-icon [icon]="faHouseCircleCheck" class="fa-3x"></fa-icon>
                    <h1 class="mainTitle">{{title}}</h1>
                </header>
            </a>

            <section class="content">
                <router-outlet></router-outlet>
            </section>
        </main>
  `,
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    title = 'Houses for rent';
    faHouseCircleCheck = faHouseCircleCheck;
}
