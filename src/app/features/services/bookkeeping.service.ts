import { Injectable, inject } from '@angular/core';
import { collectionData,  Firestore, collection, addDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Bookkeeping } from '../models/bookkeeping.model'

@Injectable({
  providedIn: 'root'
})
export class BookkeepingService {

  private firestore : Firestore = inject(Firestore);

  public bookkeepings$!: Observable<Bookkeeping[]>;
  public archivedBookkeepings$!: Observable<Bookkeeping[]>;
  public nonArchivedBookkeepings$!: Observable<Bookkeeping[]>;

  constructor() {
    const bookkeepingsCollection = collection(this.firestore, 'bookkeepings');
    this.bookkeepings$ = collectionData(bookkeepingsCollection) as Observable<Bookkeeping[]>;

    this.bookkeepings$ = this.bookkeepings$.pipe(
      map(bookkeepings => bookkeepings.filter(b => !b.archived))
    );
    this.archivedBookkeepings$ = this.bookkeepings$.pipe(
      map(bookkeepings => bookkeepings.filter(b => b.archived))
    );
  }

  createBookkeeping(name: string, description : string){
    if(!name || !description) { return };

    const bookkeeping : Bookkeeping = { name: name, description: description, archived: false }
    addDoc(collection(this.firestore, 'bookkeepings'), bookkeeping);
  }

  getBookkeepings():Observable<Bookkeeping[]> {
    return this.bookkeepings$;
  }

  async archive(name: string) {
    const bookkeepingRef = doc(this.firestore, 'bookkeepings', name);
    await updateDoc(bookkeepingRef, { archived: true });
  }

  async unarchive(name: string) {
    const bookkeepingRef = doc(this.firestore, 'bookkeepings', name);
    await updateDoc(bookkeepingRef, { archived: false });
  }

}