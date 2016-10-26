import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    Output,
    NgZone,
    AfterContentInit, OnChanges
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
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
    template: `<textarea id="{{elementId}}">{{initVal}}</textarea>`
})
export class TinymceComponent implements ControlValueAccessor {
    elementId: String = 'host';

    @Output() change = new EventEmitter();
    @Output() ready = new EventEmitter();
    @Output() blur = new EventEmitter();

    @Input() initVal;

    _value = '';
    zone;
    editor;

    ngAfterViewInit() {
        tinymce.init({
            selector: '#' + this.elementId,
            plugins: ['link', 'paste', 'table', 'autoresize'],
            skin_url: 'assets/skins/lightgray',
            autoresize_overflow_padding: 0,
            setup: editor => {
                this.editor = editor;
                editor.on('keyup', () => {
                    const content = editor.getContent();
                    this.updateValue(content);
                });
            },
        });
    }

    /**
    * Constructor
    */
    constructor(zone: NgZone) {
        console.log(this.value)
        this.value = this.initVal;
        console.log(this.value)
        this.zone = zone;
    }

    get value(): any { return this._value; };
    @Input() set value(v) {
        if (v !== this._value) {
            this._value = v;
            this.onChange(v);
        }
    }

    /**
    * Value update process
    */
    updateValue(value) {
        this.zone.run(() => {
            this.value = value;
            this.onChange(value);
            this.onTouched();
            this.change.emit(value);
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
