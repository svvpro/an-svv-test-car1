import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Car} from '../../car';
import {CarsService} from '../../cars.service';

@Component({
    selector: 'app-car-details',
    templateUrl: './car-details.component.html',
    styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

    car: Car;

    constructor(private cs: CarsService, private ar: ActivatedRoute) {
    }

    ngOnInit() {
        this.ar.params.subscribe((ps: Params) => {
            this.cs.getCar(ps.id)
                .subscribe((car: Car) => {
                    this.car = car;
                });
        });
    }

}
