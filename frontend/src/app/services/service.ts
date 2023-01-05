import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class Service {

	constructor(private http: HttpClient) { }

	private uri = 'http://localhost:4000'
	
	protected get(uri: string) {
		return this.http.get(`${this.uri}/${uri}`)
	}
	
	protected post(uri: string, data: any) {
		return this.http.post(`${this.uri}/${uri}`, data)
	}
}
