import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonRadioGroup, IonRadio, IonBackButton, IonButtons, IonToggle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonRadioGroup, IonRadio, IonBackButton, IonButtons, IonToggle]
})
export class SettingsPage implements OnInit {
  measurementUnit: string = 'metric';
  darkMode: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.measurementUnit = localStorage.getItem('measurementUnit') || 'metric';
    
    const savedDarkMode = localStorage.getItem('darkMode');
    this.darkMode = savedDarkMode === 'true';
    this.applyDarkMode();
  }

  onMeasurementChange() {
    localStorage.setItem('measurementUnit', this.measurementUnit);
  }

  onDarkModeToggle() {
    localStorage.setItem('darkMode', this.darkMode.toString());
    this.applyDarkMode();
  }

  applyDarkMode() {

    if (this.darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
}