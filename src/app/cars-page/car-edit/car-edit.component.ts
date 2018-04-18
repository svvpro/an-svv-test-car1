import {Component, OnInit} from '@angular/core';
import {CarsService} from '../../cars.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Car} from '../../car';

@Component({
    selector: 'app-car-edit',
    templateUrl: './car-edit.component.html',
    styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {

    car: Car;

    constructor(private cs: CarsService, private ar: ActivatedRoute, private rs: Router) {
    }

    ngOnInit() {
        this.ar.paramMap.subscribe((params: ParamMap) => {
            const id: string | null = params.get('id');
            if (id) {
                this.cs.getCar(id).subscribe((car: Car) => {
                    this.car = car;
                });
            } else {
                this.car = new Car();
                this.car.id = 0;
            }
        });
    }

    submitCar(): void {
        this.cs.addCar(this.car).subscribe((response: any) => {
            if (response.status === 1) {
                this.rs.navigate(['/cars']);
            }
        });
    }

}
