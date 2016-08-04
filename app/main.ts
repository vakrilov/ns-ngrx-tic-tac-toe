// this import should be first in order to load some required settings (like globals and reflect-metadata)
import {nativeScriptBootstrap} from "nativescript-angular/application";
import {AppComponent} from "./app.component";
import {provideStore} from '@ngrx/store';

global.window = {};
import {instrumentStore} from '@ngrx/store-devtools';
global.window = undefined;


import {board} from './board';
import "rxjs/add/operator/do";

// const actionLog: Middleware = action => {
//     return action.do(val => {
//         console.log('DISPATCHED ACTION: ' + JSON.stringify(val));
//     });
// };

// const stateLog: Middleware = state => {
//     return state.do(val => {
//         console.log('NEW STATE: ' + JSON.stringify(val));
//     });
// };
// instrumentStore();
nativeScriptBootstrap(AppComponent, [
    provideStore({ board }),
    // usePreMiddleware(actionLog),
    // usePostMiddleware(stateLog),
    instrumentStore()
    ]);
