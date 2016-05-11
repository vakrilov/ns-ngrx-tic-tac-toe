import {Component, EventEmitter, Input, Output, Pipe, PipeTransform} from "@angular/core";

interface AppState {
    board: Array<number>;
}


@Pipe({ name: 'playerPipe' })
export class PlayerPipe implements PipeTransform {
    transform(value: number): string {
        switch (value) {
            case 1:
                return "X";
            case -1:
                return "O";
            default:
                return "";
        }
    }
}

@Component({
    selector: "board",
    pipes:[PlayerPipe],
    template: `
    <wrap-layout itemWidth="50" itemHeight="50" width="150" height="150">
        <button *ngFor="let val of data; let i = index" [text]="val | playerPipe" (tap)="positionTap(i, val)"></button>
    </wrap-layout>`,
    styles: [`
        button {
            border-width: 1;
            border-color: gray;
        }
    `]
})
export class BoardComponent {
    @Input() data: Array<number>;
    @Output() action = new EventEmitter<{ row: number, col: number }>();

    constructor() {
    }

    positionTap(pos: number, val: number) {
        if (val === 0) {
            const col = pos % 3;
            const row = (pos - col) / 3;

            this.action.next({ row: row, col: col });
        }
    }
}
