import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ContentButton } from './detaildemo';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'general-info-demo',
    imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule],
    standalone: true,
    template: `
        <div class="flex align-items-center gap-2">
            <input pInputText type="text" class="p-inputtext-sm" [value]="value" (input)="onInput($event)" (blur)="onTouched()" placeholder="..." />
            <small *ngIf="ngControl.invalid && ngControl.touched" class="p-error"> Mínimo 3 caracteres </small>
            @for (btn of buttons; track $index) {
                @if (btn.visible) {
                    <p-button
                    [label]="btn.label"
                    [icon]="btn.icon"
                    [severity]="btn.btnSeverity"
                    [disabled]="btn.disabled"
                    (onClick)="btn.action()"> </p-button>
                }
            }
        </div>
    `
})
export class GeneralInfoDemoComponent implements ControlValueAccessor {
    value = '';
    disabled = false;
    invalid = false;

    //Botons
    @Input() buttons!: ContentButton[];

    constructor(@Optional() @Self() public ngControl: NgControl) {
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }

    // Callbacks que Angular injecta
    private onChange = (_: any) => {};
    onTouched = () => {};

    // Escriu el valor des del FormControl
    writeValue(value: string): void {
        this.value = value ?? '';
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(disabled: boolean): void {
        this.disabled = disabled;
    }

    onInput(event: Event) {
        const value = (event.target as HTMLInputElement).value;
        this.value = value;
        this.onChange(value);
    }
}
