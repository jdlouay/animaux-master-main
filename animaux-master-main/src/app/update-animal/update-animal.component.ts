import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../services/animal.service';  // Service pour gérer les animaux
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Groupe } from '../model/groupe.model';  // Modèle Groupe
import Animal from '../model/animal.model';

@Component({
  selector: 'app-update-animal',
  templateUrl: './update-animal.component.html',
})
export class UpdateAnimalComponent implements OnInit {
  currentAnimal: Animal = new Animal(); // The animal to be updated
  groupes: Groupe[] = []; // List of available groups
  updatedGroupeId!: number; // ID of the selected group
  animalForm!: FormGroup; // Reactive form

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private animalService: AnimalService,
    private formBuilder: FormBuilder // Inject FormBuilder
  ) {}

  ngOnInit(): void {
    // Initialize the form with empty/default values
    this.animalForm = this.formBuilder.group({
      nomAnimal: ['', Validators.required],
      especeAnimal: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      groupe: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  
    // Fetch groups
    this.animalService.listeGroupes().subscribe(
      (groupes) => {
        this.groupes = groupes;
      },
      (err) => {
        console.error('Error fetching groups:', err);
      }
    );
  
    // Fetch the animal
    const animalId = this.activatedRoute.snapshot.params['id'];
    this.animalService.consulterAnimal(animalId).subscribe(
      (animal) => {
        this.currentAnimal = animal;
  
        // Format the date for the input field
        const formattedDate = animal.dateNaissance
          ? new Date(animal.dateNaissance).toISOString().split('T')[0]
          : null;
  
        // Update the form with fetched animal data
        this.animalForm.patchValue({
          nomAnimal: animal.nomAnimal,
          especeAnimal: animal.especeAnimal,
          dateNaissance: formattedDate,
          groupe: animal.groupe?.idGroupe,
          email: animal.email,
        });
  
        // Update selected group ID
        this.updatedGroupeId = animal.groupe?.idGroupe || 0;
      },
      (err) => {
        console.error('Error fetching the animal:', err);
      }
    );
  }
  

  // Method to update the animal using the service
  updateAnimal(): void {
    if (this.animalForm.valid) {
      // Merge form data into currentAnimal
      const formValues = this.animalForm.value;

      const updatedAnimal: Animal = {
        ...this.currentAnimal,
        ...formValues,
        groupe: this.groupes.find((g) => g.idGroupe == formValues.groupe), // Set the selected group
      };

      // Update the animal via the service
      this.animalService.updateAnimal(updatedAnimal).subscribe(
        () => {
          console.log('Animal updated successfully');
          // Navigate back to the list of animals
          this.router.navigate(['animaux']);
        },
        (err) => {
          console.error('Error updating the animal:', err);
        }
      );
    } else {
      console.error('Form is invalid. Please correct the errors.');
    }
  }
}