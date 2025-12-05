import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonButtons } from '@ionic/angular/standalone';
import { SpoonacularService } from '../services/spoonacular';
import { addIcons } from 'ionicons';
import { heart, settings } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonButtons],
})
export class HomePage {
  studentNumber = 'G00438833';
  ingredients = '';
  recipes: any[] = [];
  isLoading = false;

  constructor(
    public spoonacularService: SpoonacularService,
    private router: Router
  ) {
    addIcons({ heart, settings });
  }

  searchRecipes() {
    if (!this.ingredients.trim()) {
      return;
    }

    this.isLoading = true;
    this.spoonacularService.searchRecipesByIngredients(this.ingredients).subscribe({
      next: (data: any) => {
        this.recipes = data.results || [];
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error fetching recipes:', error);
        this.isLoading = false;
      }
    });
  }

  viewRecipeDetails(recipeId: number) {
    this.router.navigate(['/recipe-details', recipeId]);
  }

  goToFavourites() {
    this.router.navigate(['/favourites']);
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }
}