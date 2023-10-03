import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';

@Component({
    selector: 'app-details',
    standalone: true,
    imports: [
        CommonModule,
        FontAwesomeModule,
        ReactiveFormsModule
    ],
    template: `
        <article>
            <img 
                class="listing-photo" 
                [src]="housingLocation?.photo"
                alt="Exterior photo of {{housingLocation?.name}}"
            />

            <section class="listing-description">
                <h2 class="listing-heading">{{housingLocation?.name}}</h2>
                <fa-icon [icon]="faLocationDot"></fa-icon>
                <div class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</div>
            </section>

            <section class="listing-features">
                <h2 class="section-heading">About this housing location</h2>
                <ul>
                    <li>Units available: {{housingLocation?.availableUnits}}</li>
                    <li>Does this location have wifi: {{housingLocation?.wifi}}</li>
                    <li>Does this location have laundry: {{housingLocation?.laundry}}</li>
                </ul>
            </section>

            <section class="listing-apply">
                <h2 class="section-heading">Apply now to live here</h2>

                <form [formGroup]="applyForm" (submit)="submitApplication()">
                    <label for="first-name">First Name</label>
                    <input id="first-name" type="text" formControlName="firstName">

                    <label for="last-name">Last Name</label>
                    <input id="last-name" type="text" formControlName="lastName">

                    <label for="email">Email</label>
                    <input id="email" type="email" formControlName="email">
                    <button type="submit" class="primary">Apply now</button>
                </form>
            </section>
        </article>
  `,
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
    route: ActivatedRoute = inject(ActivatedRoute);
    housingService: HousingService = inject(HousingService);
    housingLocationId = -1;
    housingLocation: HousingLocation | undefined = undefined;

    faLocationDot = faLocationDot;

    applyForm = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        email: new FormControl(''),
    })

    constructor() {
        this.housingLocationId = Number(this.route.snapshot.params['id'])
        this.housingService.getHousingLocationById(this.housingLocationId).then((housingLocation: HousingLocation|undefined) => {
            this.housingLocation = housingLocation
        })
    }

    submitApplication() {
        this.housingService.submitApplication(
            this.applyForm.value.firstName ?? '',
            this.applyForm.value.lastName ?? '',
            this.applyForm.value.email ?? ''
        )
    }
}
