import { Injectable, inject } from '@angular/core';
import { collectionData,  Firestore, collection, addDoc, updateDoc, query, where, getDocs } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Bookkeeping } from '../models/bookkeeping.model'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookkeepingService {

  private firestore : Firestore = inject(Firestore);
  private authService: AuthService = inject(AuthService);

  public bookkeepings$!: Observable<Bookkeeping[]>;
  public archivedBookkeepings$!: Observable<Bookkeeping[]>;

  private currentUser = this.authService.currentUserSignal();

  constructor() {
    if (this.currentUser?.userId) {
      const userBookkeepingsCollection = collection(this.firestore, `user/${this.currentUser.userId}/bookkeepings`);

      this.bookkeepings$ = collectionData(userBookkeepingsCollection, { idField: 'id' }) as Observable<Bookkeeping[]>;

      this.bookkeepings$.subscribe(bookkeepings => {
        console.log(bookkeepings);
      });

      this.archivedBookkeepings$ = this.bookkeepings$.pipe(
        map(bookkeepings => bookkeepings.filter(b => b.archived))
      );

      this.bookkeepings$ = this.bookkeepings$.pipe(
        map(bookkeepings => bookkeepings.filter(b => !b.archived))
      );
    } else {
      throw new Error('User is not authenticated');
    }
  }

  async createBookkeeping(name: string, description : string){
    const bookkeeping = { name: name, description: description, archived: false }
    const currentUser = this.authService.currentUserSignal();

    if (currentUser?.userId) {
      const userBookkeepingsCollection = collection(this.firestore, `user/${currentUser.userId}/bookkeepings/`);
      const bookkeepingsCollection = collection(this.firestore, `bookkeepings/`);

      await Promise.all([
        addDoc(userBookkeepingsCollection, bookkeeping),
        addDoc(bookkeepingsCollection, bookkeeping)
      ])
    } else {
      throw new Error('User is not authenticated');
    }
  }

  getBookkeepings() : Observable<Bookkeeping[]> {
    return this.bookkeepings$;
  }

  getArchivedBookkeepings() : Observable<Bookkeeping[]> {
    return this.archivedBookkeepings$;
  }

  async archive(name: string) {

    if (!this.currentUser?.userId) {
      throw new Error('User is not authenticated');
    }

    const bookkeepingsCollection = collection(this.firestore, `user/${this.currentUser.userId}/bookkeepings/`);
    const q = query(bookkeepingsCollection, where('name', '==', name));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await updateDoc(doc.ref, { archived: true });
    });
  }

  async unarchive(name: string) {

    if (!this.currentUser?.userId) {
      throw new Error('User is not authenticated');
    }

    const bookkeepingsCollection = collection(this.firestore, `user/${this.currentUser.userId}/bookkeepings/`);
    const q = query(bookkeepingsCollection, where('name', '==', name));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await updateDoc(doc.ref, { archived: false });
    });
  }

}