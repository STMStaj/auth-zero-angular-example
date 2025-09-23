import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StrapiService {
    private apiUrl = 'http://localhost:1337';

    constructor(private http: HttpClient) { }

    getContentType(contentType: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/${contentType}`);
    }

    getSingleItem(contentType: string, id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/${contentType}/${id}`);
    }

    createItem(contentType: string, data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/${contentType}`, { data });
    }

    updateItem(contentType: string, id: number, data: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/${contentType}/${id}`, { data });
    }

    deleteItem(contentType: string, id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${contentType}/${id}`);
    }
}