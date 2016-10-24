import { NgModule } from '@angular/core';

import { TinymceComponent } from './tinymce.component';

/**
 * TinymceModule
 */
@NgModule({
    declarations: [
        TinymceComponent,
    ],
    exports: [
        TinymceComponent,
    ]
})
export class TinymceModule { }