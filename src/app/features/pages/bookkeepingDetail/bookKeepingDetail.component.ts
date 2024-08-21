import { Component, inject } from '@angular/core';
import { BookkeepingService } from '../../services/bookkeeping.service';
import { ActivatedRoute } from '@angular/router';
import { Bookkeeping } from '../../models/bookkeeping.model';
import { TransactionsService } from '../../services/transactions.service';
import { Transaction } from '../../models/transactions.model';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookkeepingDetail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookKeepingDetail.component.html',
  styleUrl: './bookKeepingDetail.component.css'
})
export class BookKeepingDetailComponent {

  private bookService = inject(BookkeepingService);
  private transactionService = inject(TransactionsService);
  private categoryService = inject(CategoryService);

  private bookkeepingsName : string | undefined;
  private bookkeeping : Bookkeeping | undefined;

  public transactions : Transaction[]
  public categories : Category[];

  constructor(private activatedRouter : ActivatedRoute) {
    this.bookkeepingsName = undefined;
    this.bookkeeping = undefined;
    this.transactions = [];
    this.categories = [];

    this.activatedRouter.params.subscribe({
      next: (params) => {
        this.bookkeepingsName = params['bookkeepingName'];

        if (!this.bookkeepingsName) {
          throw Error("Bookkeepingsname not found");
        }
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.transactionService.getTransactions().subscribe({
      next: (transactions) => {
        console.log(transactions);
        const result = transactions.get(this.bookkeepingsName!);


        if (result !== undefined) {
          this.transactions = result;
        }
      }
    });

    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        console.log(categories);
        const result = categories.get(this.bookkeepingsName!);

        if (result !== undefined) {
          this.categories = result;
        }
      }
    });
  }

}
