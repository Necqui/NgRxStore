import { Blockchain } from './../blockchain/blockchain.model';
import { REMOVE_COIN } from './../reducers/blockchain.reducer';
import { Component, OnInit } from '@angular/core';
import { AppState } from './../app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  coins: Blockchain[];
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select(state => state.blockchain)
      .subscribe({
        next: res => this.coins = res,
        error: err => console.error('Observer got an error: ' + err),
        complete: () => console.log('Observer got a complete notification'),
      });
  }

  removeCoin(payload) {
    if (confirm("Are you sure to delete '" + payload.name + "'?")) {
      this.store.dispatch({
        type: REMOVE_COIN,
        payload: payload
      });
    }
  }

}
