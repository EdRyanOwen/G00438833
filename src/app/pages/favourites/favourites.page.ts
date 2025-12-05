import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { SpoonacularService } from '../../services/spoonacular';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonBackButton, IonButtons]
})
export class FavouritesPage implements OnInit {
  favouriteRecipes: any[] = [];
  isLoading = false;

  constructor(
    public spoonacularService: SpoonacularService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadFavourites();
  }

  ionViewWillEnter() {
    this.loadFavourites();
  }

  loadFavourites() {
    const favouriteIds = JSON.parse(localStorage.getItem('favourites') || '[]');
    
    if (favouriteIds.length === 0) {
      this.favouriteRecipes = [];
      return;
    }

    this.isLoading = true;
    this.favouriteRecipes = [];

    favouriteIds.forEach((id: number, index: number) => {
      this.spoonacularService.getRecipeInformation(id).subscribe({
        next: (data: any) => {
          this.favouriteRecipes.push(data);
          
          if (index === favouriteIds.length - 1) {
            this.isLoading = false;
          }
        },
        error: (error: any) => {
          console.error('Error fetching recipe:', error);
          if (index === favouriteIds.length - 1) {
            this.isLoading = false;
          }
        }
      });
    });
  }

  viewRecipeDetails(recipeId: number) {
    this.router.navigate(['/recipe-details', recipeId]);
  }
}