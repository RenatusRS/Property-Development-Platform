import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export abstract class Service {

	constructor(private http: HttpClient) { }

	private uri = 'http://localhost:4000'
	
	protected abstract controller: string;
	
	protected get(uri: string) {
		return this.http.get(`${this.uri}/${this.controller}/${uri}`)
	}
	
	protected post(uri: string, data: any) {
		return this.http.post(`${this.uri}/${this.controller}/${uri}`, data)
	}
}
