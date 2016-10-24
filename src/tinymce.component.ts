import {
    Component,
    OnDestroy,
    AfterViewInit,
    EventEmitter,
    forwardRef,
    Input,
    Output
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
declare var tinymce;

@Component({
    selector: 'tinymce',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TinymceComponent),
            multi: true
        }
    ],
    template: `<textarea  id="{{elementId}}"></textarea>`
})
export class TinymceComponent implements AfterViewInit, OnDestroy {
    elementId: String = 'host';
    @Output() onEditorKeyup = new EventEmitter<any>();
    _value = '';
    editor;

    ngAfterViewInit() {
        tinymce.init({
            selector: '#' + this.elementId,
            plugins: [],
            skin_url: 'assets/skins/lightgray',
            setup: editor => {
                this.editor = editor;
                editor.on('keyup', () => {
                    const content = editor.getContent();
                    this.onEditorKeyup.emit(content);
                });
            },
        });
    }

    ngOnDestroy() {
        tinymce.remove(this.editor);
    }

    /**
     * Implements ControlValueAccessor
     */
    writeValue(value) {
        this._value = value;
    }
    onChange(_) { }
    onTouched() { }
    registerOnChange(fn) { this.onChange = fn; }
    registerOnTouched(fn) { this.onTouched = fn; }
}
