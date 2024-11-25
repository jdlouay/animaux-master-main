import Animal from '../model/animal.model';
import { Groupe } from '../model/groupe.model';  // Import correct de la classe Groupe
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
 // Import correct de la classe Animal

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private apiURL = 'http://localhost:9090/api';
  // URL de l'API backend
  animaux!: Animal[];
  constructor(private http: HttpClient) {}

  /**
   * Récupérer la liste de tous les animaux
   */
  listeAnimaux(): Observable<Animal[]> {
    console.log("🚀 ~ file: animal.service.ts:27 ~ AnimalService ~ listeAnimaux ~ `${this.apiURL}/animaux`:", `${this.apiURL}/animaux`)
    return this.http.get<Animal[]>(`${this.apiURL}/animaux`);
  }


  /**
   * Ajouter un nouvel animal
   */
  ajouterAnimal(animal: Animal): Observable<Animal> {
    console.log("🚀 ~ file: animal.service.ts:36 ~ AnimalService ~ ajouterAnimal ~ animal:", animal)
    return this.http.post<Animal>(`${this.apiURL}/animaux`, animal, httpOptions);
  }


  /**
   * Consulter un animal par son ID
   */
  consulterAnimal(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${this.apiURL}/animaux/${id}`);
  }

  /**
   * Mettre à jour un animal
   */
  updateAnimal(animal: Animal): Observable<Animal> {
    return this.http.put<Animal>(`${this.apiURL}/animaux`, animal, httpOptions);
  }

  /**
   * Supprimer un animal
   */
  supprimerAnimal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/animaux/${id}`);
  }

  /**
   * Récupérer la liste de tous les groupes
   */
  listeGroupes(): Observable<Groupe[]> {
    return this.http.get<Groupe[]>(`${this.apiURL}/groupes`);
  }
}
