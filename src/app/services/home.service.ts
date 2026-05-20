
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { firstValueFrom } from 'rxjs';
import { FormDataWeb } from '../landing/dto/form.dto';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

    constructor(private http: HttpClient) { }

    sendFormData(data: FormDataWeb): Promise<any> {
        return firstValueFrom(this.http.post(environment.apiUrl + '/quotation/submit', data));
    }

}