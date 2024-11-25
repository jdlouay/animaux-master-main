import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Groupe } from '../model/groupe.model';
import Animal from '../model/animal.model';
import { AnimalService } from '../services/animal.service';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.css'],
})
export class AddAnimalComponent implements OnInit {
  animalForm!: FormGroup; // Reactive Form Group
  groupes: Groupe[] = []; // List of available groups
  newAnimal = new Animal(); // Object representing the new animal

  constructor(
    private formBuilder: FormBuilder, // FormBuilder for reactive forms
    private animalService: AnimalService, // Service to handle animal operations
    private router: Router // Router for navigation
  ) {}

  ngOnInit(): void {
    this.loadGroupes();
  
    this.animalForm = this.formBuilder.group({
      nom: ['', Validators.required], // Matches 'formControlName="nom"'
      especeanimal: ['', Validators.required], // Matches 'formControlName="especeanimal"'
      date_naissance: ['', Validators.required], // Matches 'formControlName="date_naissance"'
      email: ['', [Validators.required, Validators.email]], // Matches 'formControlName="email"'
      groupe: ['', Validators.required], // Matches 'formControlName="groupe"'
    });
  }
  

  /**
   * Load available groups from the service.
   */
  loadGroupes(): void {
    this.animalService.listeGroupes().subscribe(
      (groupes) => {
        this.groupes = groupes;
      },
      (err) => {
        console.error('Error loading groups:', err);
      }
    );
  }

  /**
   * Initialize the reactive form with validation.
   */
  initializeForm(): void {
    this.animalForm = this.formBuilder.group({
      nom: ['', Validators.required],
      especeanimal: ['', Validators.required],
      date_naissance: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      groupe: ['', Validators.required],
    });
  }

  /**
   * Add a new animal.
   */
  addAnimal(): void {
    if (this.animalForm.valid) {

      // Get form values
      const formValues = this.animalForm.value;

      // Map form values to the new animal object
      this.newAnimal.nomAnimal = formValues.nom;
      this.newAnimal.especeAnimal = formValues.especeanimal;
      this.newAnimal.dateNaissance = formValues.date_naissance;
      this.newAnimal.email = formValues.email;
      this.newAnimal.groupe = this.groupes.find(
        (g) => g.idGroupe == formValues.groupe
      )!;


      console.log("🚀 ~ file: add-animal.component.ts:94 ~ AddAnimalComponent ~ addAnimal ~ this.newAnimal:", this.newAnimal)
      // Add the animal using the service
      this.animalService.ajouterAnimal(this.newAnimal).subscribe(
        (animal) => {
          console.log('Animal added successfully:', animal);
          this.router.navigate(['animaux']); // Navigate to the animal list
        },
        (err) => {
          console.error('Error adding animal:', err);
        }
      );

    } else {
      console.error('Form is invalid. Please correct the errors.');
    }
  }
}
