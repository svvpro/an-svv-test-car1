import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {CarsService} from '../../cars.service';
import {Car} from '../../car';

@Component({
    selector: 'app-car-delete',
    templateUrl: './car-delete.component.html',
    styleUrls: ['./car-delete.component.css']
})
export class CarDeleteComponent implements OnInit {

    car: Car;

    constructor(private cs: CarsService, private ar: ActivatedRoute, private rs: Router) {
    }

    ngOnInit() {
        this.ar.paramMap.subscribe((params: ParamMap) => {
            const id: string | null = params.get('id');
            this.cs.getCar(id).subscribe((car: Car) => {
                this.car = car;
            });
        });
    }

    deleteCar(): void {
        this.cs.deleteCar(this.car.id).subscribe((response: any) => {
            if (response.status === 1) {
                this.rs.navigate(['/cars']);
            }
        });
    }
}
