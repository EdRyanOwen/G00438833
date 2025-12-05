import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpoonacularService {
  private apiKey = '70759a4f7911402abcc53d3c51d3b759';
  private baseUrl = 'https://api.spoonacular.com';

  constructor(private http: HttpClient) { }

  searchRecipesByIngredients(ingredients: string): Observable<any> {
    const url = `${this.baseUrl}/recipes/complexSearch?apiKey=${this.apiKey}&query=${ingredients}&addRecipeInformation=true&fillIngredients=true&number=10`;
    return this.http.get(url);
  }

  getRecipeInformation(id: number): Observable<any> {
    const url = `${this.baseUrl}/recipes/${id}/information?apiKey=${this.apiKey}&includeNutrition=false`;
    return this.http.get(url);
  }
}