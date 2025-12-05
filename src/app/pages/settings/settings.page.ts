
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonRadioGroup, IonRadio, IonBackButton, IonButtons } from '@ionic/angular/standalone';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonRadioGroup, IonRadio, IonBackButton, IonButtons]
})
export class SettingsPage implements OnInit {
  measurementUnit: string = 'metric';

  constructor(private router: Router) {}

  ngOnInit() {
    this.measurementUnit = localStorage.getItem('measurementUnit') || 'metric';
  }

  onMeasurementChange() {
    localStorage.setItem('measurementUnit', this.measurementUnit);
  }
}