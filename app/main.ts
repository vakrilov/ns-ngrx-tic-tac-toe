// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { NativeScriptModule, platformNativeScriptDynamic } from "nativescript-angular/platform";
import { AppComponent } from "./app.component";
import { provideStore } from '@ngrx/store';
import { NgModule } from "@angular/core";
import { NativeScriptDevToolsMonitors } from "ngrx-devtools-nativescript";


global.window = {};
import { instrumentStore } from '@ngrx/store-devtools';
global.window = undefined;

import { board } from './board';
import { BoardComponent } from './board.component';
import { PlayerPipe } from './player.pipe';

// logger meta reducer
export const logger = reducer => {
    return function (state, action) {
        console.log('---- DISPATCHED ACTION: ' + JSON.stringify(action));

        //calculate next state based on action
        let nextState = reducer(state, action);

        console.log('---- NEW STATE: ' + JSON.stringify(nextState));
        return nextState;
    };
};

console.log("NativeScriptDevToolsMonitors: " + NativeScriptDevToolsMonitors);

@NgModule({
    declarations: [BoardComponent, PlayerPipe],
    imports: [NativeScriptModule, NativeScriptDevToolsMonitors],
    providers: [
        provideStore({ board: logger(board) }),
        instrumentStore()
    ],
    bootstrap: [AppComponent]
})
class AppModule { }

platformNativeScriptDynamic().bootstrapModule(AppModule);