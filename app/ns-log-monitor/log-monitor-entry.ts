import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';

import {LogEntryItem} from './log-entry-item';
import {LogMonitorButton} from './log-monitor-button';

@Component({
  selector: 'log-monitor-entry',
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [LogMonitorButton],
  encapsulation: ViewEncapsulation.Emulated,
  template: `
    <grid-layout columns="* auto" class="container"> 
      <label [text]="item.action.type"
            (tap)="handleToggle()"
            class="title-bar"
            [class.collapsed]="item.collapsed"></label>
      
      <stack-layout col="1" *ngIf="!item.collapsed" orientation="horizontal">   
        <log-monitor-button (action)="logPayload()" text="Log Payload">
        </log-monitor-button>
        
        <log-monitor-button (action)="logState()" text="Log State">
        </log-monitor-button>
      </stack-layout>
    </grid-layout>
  `,
  styles: [`
    .container {
      horizontal-align: stretch;
    }
    .title-bar {
      text-align: left;
      horizontal-align: stretch;
      vertical-align: center;
      margin: 10;
      font-family: monosapce;
      color: #FFFFFF;
      font-size: 16;
      font-weight: bold;
    }
    .collapsed{
      text-decoration: line-through;
      font-style: italic;
      opacity: 0.5;
    }
  `]
})
export class LogMonitorEntry {
  @Input() item: LogEntryItem;
  @Output() toggle = new EventEmitter();

  handleToggle() {
    this.toggle.next({ id: this.item.actionId });
  }

  logPayload() {
    console.log("ACTION: " + JSON.stringify(this.item.action));
  }

  logState() {
    console.log("STATE: " + JSON.stringify(this.item.state));
  }
}
