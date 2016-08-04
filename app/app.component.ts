import {Component} from "@angular/core";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import {Store} from '@ngrx/store';
import {PLAY_O, PLAY_X, RESET} from './board';
import {BoardComponent} from './board.component';

import { NSDockMonitor } from "ngrx-devtools-nativescript";
interface AppState {
    board: Array<number>;
}

@Component({
    selector: "my-app",
    directives: [BoardComponent, NSDockMonitor],
    template: `
    <grid-layout rows="50, auto, auto, *">
        <button text="new game" (tap)="reset()"></button>
        
        <label row="1" [text]="currentPlayer ? 'X is next' : 'O is next'" class="next" ></label>
        
        <grid-layout row="2" class="board">
            <board [data]="board$ | async" (action)="positionSelected($event, currentPlayer)" ></board>
        </grid-layout>
        
        <label row="2" *ngIf="winner" [text]="winner > 0 ? 'X WINS' : 'O WINS'" class="win"></label>
        
        <ns-dock-monitor screenCover="0.5"></ns-dock-monitor>
    </grid-layout>`,
    styles: [`
        .board {
            horizontal-align: center;    
            vertical-align: top;
            margin: 30;
        }
        
        .win {
            font-size: 56;
            font-weight: bold;
            horizontal-align: center;
        }
        
        .next{
            horizontal-align: center;
        }
    `]
})
export class AppComponent {
    board$: Observable<Array<number>>;

    currentPlayer: boolean; // ture:X, false:O
    winner: number; // 1:X, -1:O

    constructor(public store: Store<AppState>) {
        this.board$ = store.select(s => s.board);

        this.board$.map(b => b.reduce((a, b) => a + b, 0) <= 0)
            .subscribe((val) => this.currentPlayer = val);

        this.board$.map(checkWinner)
            .subscribe((val) => this.winner = val);
    }

    positionSelected(payload: { row: number, col: number }, player: boolean) {
        this.store.dispatch({
            type: player ? PLAY_X : PLAY_O,
            payload: payload
        });
    }

    reset() {
        this.store.dispatch({ type: RESET });
    }
}

const winPositions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
function checkWinner(board: Array<number>): number {
    for (let winPos of winPositions) {
        let res = winPos.reduce((sum, index) => sum + board[index], 0);

        if (res === 3 || res === -3) {
            return res / 3;
        }
    }
    return 0;
}