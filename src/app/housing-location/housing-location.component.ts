import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faHandPointRight } from '@fortawesome/free-solid-svg-icons';

import { HousingLocation } from '../housing-location';

@Component({
    selector: 'app-housing-location',
    standalone: true,
    imports: [
        CommonModule,
        FontAwesomeModule,
        RouterLink,
        RouterOutlet
    ],
    template: `
    <div class="listing">
        <img class="listing-photo" [src]="housingLocation.photo" alt="Exterior photo of {{housingLocation.name}}">
        
        <div class="info">
            <div class="listing-heading">{{ housingLocation.name }}</div>

            <div class="listing-location">
                <fa-icon [icon]="faLocationDot"></fa-icon>
                <div>{{ housingLocation.city}}, {{housingLocation.state }}</div>
            </div>

            <div>
                <fa-icon [icon]="faHandPointRight"></fa-icon>
                <a [routerLink]="['/details', housingLocation.id]">
                    Learn More
                </a>
            </div>

        </div> 
    </div>
  `,
    styleUrls: ['./housing-location.component.scss']
})
export class HousingLocationComponent {
    @Input() housingLocation!: HousingLocation;
    faLocationDot = faLocationDot;
    faHandPointRight = faHandPointRight;
}
