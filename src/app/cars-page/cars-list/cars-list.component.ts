import {Component, OnInit} from '@angular/core';
import {CarsService} from '../../cars.service';
import {Car} from '../../car';

@Component({
    selector: 'app-cars-list',
    templateUrl: './cars-list.component.html',
    styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit {

    cars: Car[];

    constructor(private cs: CarsService) {
    }

    ngOnInit() {
        this.cs.getCarsList().subscribe((cars: Car[]) => {
            this.cars = cars;
        });
    }

}
