import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardContent, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { SpoonacularService } from '../../services/spoonacular';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardContent, IonBackButton, IonButtons]
})
export class RecipeDetailsPage implements OnInit {
  recipe: any = null;
  recipeId: number = 0;
  measurementUnit: string = 'metric';
  isFavourite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public spoonacularService: SpoonacularService
  ) {}

  ngOnInit() {
  
    this.recipeId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.measurementUnit = localStorage.getItem('measurementUnit') || 'metric';
    
    this.checkIfFavourite();
    
    this.loadRecipeDetails();
  }

  loadRecipeDetails() {
    this.spoonacularService.getRecipeInformation(this.recipeId).subscribe({
      next: (data: any) => {
        this.recipe = data;
      },
      error: (error: any) => {
        console.error('Error fetching recipe details:', error);
      }
    });
  }

  checkIfFavourite() {
    const favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    this.isFavourite = favourites.includes(this.recipeId);
  }

  toggleFavourite() {
    let favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    
    if (this.isFavourite) {
      favourites = favourites.filter((id: number) => id !== this.recipeId);
      this.isFavourite = false;
    } else {
      favourites.push(this.recipeId);
      this.isFavourite = true;
    }
    
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }

  getIngredientAmount(ingredient: any): string {
    if (this.measurementUnit === 'metric') {
      return `${ingredient.measures.metric.amount} ${ingredient.measures.metric.unitLong}`;
    } else {
      return `${ingredient.measures.us.amount} ${ingredient.measures.us.unitLong}`;
    }
  }
}