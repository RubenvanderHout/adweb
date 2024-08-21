import { inject, Injectable } from "@angular/core";
import { Firestore } from "@angular/fire/firestore";
import { Transaction } from "../models/transactions.model";
import { BehaviorSubject, filter, forkJoin, from, map, Observable, tap } from "rxjs";
import { BookkeepingService } from "./bookkeeping.service";
import { doc, getDoc } from "firebase/firestore";

@Injectable({
    providedIn: 'root'
})
export class TransactionsService {

    private firestore : Firestore = inject(Firestore);
    private bookkeepingService: BookkeepingService = inject(BookkeepingService);

    private transactionsSubject = new BehaviorSubject<Map<string, Transaction[]>>(new Map());

    constructor() {
        this.bookkeepingService.getBookkeepings().pipe(
            tap(bookkeepings => console.log(bookkeepings))
        ).subscribe({
            next: (bookkeepings) => {
                const transactionMap = new Map(this.transactionsSubject.value);

                forkJoin(
                    bookkeepings.map(bookkeeping =>
                        this.fetchTransactions(bookkeeping.transactions).pipe(
                            tap(result => {
                                const old = transactionMap.get(bookkeeping.name);
                                if (old !== undefined) {
                                    result.forEach(transaction => old.push(transaction));
                                } else {
                                    transactionMap.set(bookkeeping.name, result);
                                }
                            })
                        )
                    )
                ).subscribe(() => {
                    this.transactionsSubject.next(transactionMap);
                });
            }
        });
    }

    private fetchTransactions(refs: string[]): Observable<Transaction[]> {
        const observables = refs.map(path =>
            from(getDoc(doc(this.firestore, path))).pipe(
                tap(docSnapshot => {
                    if (!docSnapshot.exists()) {
                        console.error("No document found at path:", path);
                    }
                }),
                map(docSnapshot => docSnapshot.exists() ? docSnapshot.data() as Transaction : null),
                filter(transaction => transaction !== null)
            )
        );

        return forkJoin(observables);
    }

    public getTransactions(){
        return this.transactionsSubject;
    }






}