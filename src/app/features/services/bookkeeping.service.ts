import { Injectable, inject } from '@angular/core';
import { collectionData,  Firestore, collection, addDoc, updateDoc, query, where, doc } from '@angular/fire/firestore';
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

      const userBookkeepingsCollection = collection(this.firestore, 'bookkeepings');
      const userQuery = query(userBookkeepingsCollection, where('owner', '==', this.currentUser.userId));

      this.bookkeepings$ = collectionData(userQuery, { idField: 'id' }) as Observable<Bookkeeping[]>;

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

  async createBookkeeping(bookkeeping : Bookkeeping){

    const currentUser = this.authService.currentUserSignal();

    bookkeeping.owner = currentUser?.userId ?? '';

    //@ts-ignore
    delete bookkeeping.id;

    if (currentUser?.userId) {
      const bookkeepingsCollection = collection(this.firestore, `bookkeepings/`);
      await addDoc(bookkeepingsCollection, bookkeeping)
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

  async archive(id: string) {

    if (!this.currentUser?.userId) {
      throw new Error('User is not authenticated');
    }
    const docRef = doc(this.firestore, `/bookkeepings/${id}`);
    await updateDoc(docRef, { archived: true });
  }

  async unarchive(id: string) {

    if (!this.currentUser?.userId) {
      throw new Error('User is not authenticated');
    }
    const docRef = doc(this.firestore, `/bookkeepings/${id}`);
    await updateDoc(docRef, { archived: false });
  }

}