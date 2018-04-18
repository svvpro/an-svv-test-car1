import {Injectable} from '@angular/core';
import {Car} from './car';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {catchError, retry} from 'rxjs/operators';


// const cars: Car[] = [
//     {
//         brand: 'Audi',
//         model: 'A6',
//         year: 2009
//     },
//     {
//         brand: 'BMW',
//         model: 'M6',
//         year: 2015
//     },
//     {
//         brand: 'Mercedes',
//         model: 'S600',
//         year: 2011
//     }
// ];

@Injectable()
export class CarsService {

    constructor(private http: HttpClient) {
    }

    getCarsList() {
        return this.http.get('assets/php/getcars.php')
            .pipe(
                catchError(this.handlerError)
            );
    }

    getCar(id: string) {
        const params = {id: id};
        return this.http.get<Car>('assets/php/getcars.php', {params: params});
    }

    addCar(car: Car) {
        const data = JSON.stringify(car);
        console.log(data);
        return this.http.post('assets/php/setcars.php', data);
    }

    deleteCar(id: number): any {
        const data = JSON.stringify({id: id, mode: 'delete'});
        return this.http.post('assets/php/setcars.php', data);
    }

    private handlerError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('Произошла ошибка : ', error.error.message);
        } else {
            console.error(`Бекенд вернул код ошибки: ${error.status}, ` +
                `Описание ошибки: ${error.error}`);
        }
        return new ErrorObservable('Произошла ошибка. Попробуйте позже!');
    }


}
