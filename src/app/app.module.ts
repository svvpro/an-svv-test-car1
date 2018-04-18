import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {AboutPageComponent} from './about-page/about-page.component';
import {CarsPageComponent} from './cars-page/cars-page.component';
import {RouterModule, Routes} from '@angular/router';
import {NavigationComponent} from './navigation/navigation.component';
import {CarsListComponent} from './cars-page/cars-list/cars-list.component';
import {CarsService} from './cars.service';
import {CarDetailsComponent} from './cars-page/car-details/car-details.component';
import {HttpClientModule} from '@angular/common/http';
import { CarEditComponent } from './cars-page/car-edit/car-edit.component';
import {FormsModule} from '@angular/forms';
import { CarDeleteComponent } from './cars-page/car-delete/car-delete.component';

const appRoutes: Routes = [
    {path: '', component: AboutPageComponent},
    {
        path: 'cars', component: CarsPageComponent, children: [
            {path: 'create', component: CarEditComponent},
            {path: ':id/edit', component: CarEditComponent},
            {path: ':id/delete', component: CarDeleteComponent},
            {path: ':id', component: CarDetailsComponent},
        ]
    }
];


@NgModule({
    declarations: [
        AppComponent,
        AboutPageComponent,
        CarsPageComponent,
        NavigationComponent,
        CarsListComponent,
        CarDetailsComponent,
        CarEditComponent,
        CarDeleteComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [CarsService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
