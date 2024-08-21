import { inject, Injectable } from "@angular/core";
import { doc, docData, Firestore } from "@angular/fire/firestore";
import { BookkeepingService } from "./bookkeeping.service";
import { BehaviorSubject, forkJoin, Observable, tap } from "rxjs";
import { Category } from "../models/category.model";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private firestore = inject(Firestore);
    private bookkeepingService = inject(BookkeepingService);

    private categoriesSubject = new BehaviorSubject<Map<string, Category[]>>(new Map());

    constructor(){
        this.bookkeepingService.getBookkeepings().pipe(
            tap(bookkeepings => console.log(bookkeepings))
        ).subscribe({
            next: (bookkeepings) => {
                let categoryMap = new Map<string, Category[]>();

                if (this.categoriesSubject.value) {
                    categoryMap = this.categoriesSubject.value;
                }

                bookkeepings.forEach((bookkeeping) => {
                    this.fetchCategories(bookkeeping.categories).subscribe({
                        next: (categories) => {
                            console.log(categories);

                            categoryMap.set(bookkeeping.name, categories);

                        }
                    });
                });
                this.categoriesSubject.next(categoryMap);
            }
        });
    }

    private fetchCategories(refs : string[]) {
        const observables = refs.map(path => {
            const docref = doc(this.firestore, path);
            return docData(docref, { idField: 'id'}) as Observable<Category>;
        })

        return forkJoin(observables);
    }

    public getCategories(){
        return this.categoriesSubject
    }

}