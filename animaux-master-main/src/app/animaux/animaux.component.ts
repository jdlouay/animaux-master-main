import { Component, OnInit } from '@angular/core';
import Animal from '../model/animal.model';
import { AnimalService } from '../services/animal.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-animaux',
  templateUrl: './animaux.component.html',
})
export class AnimauxComponent implements OnInit {
  animaux!: Animal[]; // Un tableau d'objets Animal

  constructor(private animalService: AnimalService , public authService:AuthService) {
   // this.animaux = animalService.listeAnimaux(); // Récupère la liste des animaux via le service
  }

  ngOnInit(): void {
    this.animalService.listeAnimaux().subscribe((data) => {
      console.log("🚀 ~ file: animaux.component.ts:19 ~ AnimauxComponent ~ this.animalService.listeAnimaux ~ data:", data)

      this.animaux = data;
    });
  }


  chargerAnimaux(): void {
    this.animalService.listeAnimaux().subscribe(
      (data) => {
        console.log("🚀 ~ file: animaux.component.ts:27 ~ AnimauxComponent ~ chargerAnimaux ~ data:", data)

        this.animaux = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des animaux', error);
      }
    );
  }

  // Ajoutez cette méthode pour supprimer un animal
  supprimerAnimal(animal: Animal): void {
    const conf = confirm(
      `Êtes-vous sûr de vouloir supprimer ${animal.nomAnimal} ?`
    );
    if (conf) {
      this.animalService.supprimerAnimal(animal.idAnimal).subscribe(
        () => {
          console.log('Animal supprimé avec succès');
          this.chargerAnimaux(); // Recharge la liste des animaux après suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'animal', error);
        }
      );
    
    }}}