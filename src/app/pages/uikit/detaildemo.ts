import { LayoutService } from '@/layout/service/layout.service';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { GeneralInfoDemoComponent } from './generalinfodemo';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonSeverity } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabel } from 'primeng/floatlabel';

export interface ContentButton {
    label: string;
    visible: boolean;
    disabled: boolean;
    btnSeverity: ButtonSeverity;
    icon: string;
    action: () => void;
}

@Component({
    selector: 'app-detail-demo',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, InputTextModule, GeneralInfoDemoComponent, TextareaModule, FloatLabel],
    template: `
        <form [formGroup]="form">
            <ng-template #topbarExtra>
                <general-info-demo formControlName="search" [buttons]="this.detailButtons"> </general-info-demo>
            </ng-template>

            <div class="card">
                <h5>Contenido de la página de detalle</h5>

                <p-floatlabel>
                    <textarea pTextarea id="over_label" formControlName="description" rows="5" cols="30" style="resize: none" class="h-full"> </textarea>
                    <label for="over_label">Descripción</label>
                </p-floatlabel>
            </div>
        </form>
    `
})
export class DetailDemo implements AfterViewInit, OnDestroy {
    @ViewChild('topbarExtra') topbarExtra!: TemplateRef<any>;

    form: FormGroup;

    detailButtons: ContentButton[] = [
        {
            label: 'backToList',
            visible: true,
            disabled: false,
            btnSeverity: 'secondary',
            icon: 'pi-arrow-left',
            action: () => this.goBackToList()
        },
        {
            label: 'discardChanges',
            visible: true,
            disabled: false,
            btnSeverity: 'danger',
            icon: 'pi-times',
            action: () => this.discardChanges()
        },
        {
            label: 'saveProduct',
            visible: false,
            disabled: false,
            btnSeverity: 'success',
            icon: 'pi-save',
            action: () => this.saveProduct()
        }
    ];

    constructor(
        private layoutService: LayoutService,
        private fb: FormBuilder,
        public router: Router,
        private route: ActivatedRoute
    ) {
        this.form = this.fb.group({
            search: ['', [Validators.required, Validators.minLength(3)]],
            description: ['']
        });
    }

    ngAfterViewInit() {
        // Enviamos el template al servicio para que el Topbar lo renderice
        // Usamos setTimeout para evitar el error 'ExpressionChangedAfterItHasBeenCheckedError'
        setTimeout(() => {
            this.layoutService.setTopbarContent(this.topbarExtra);
        });
    }

    ngOnDestroy() {
        // Limpiamos el contenido al salir de esta pantalla
        this.layoutService.setTopbarContent(null);
    }

    discardChanges() {
        this.form.reset({
            search: ''
        });
    }

    goBackToList(): void {
        // normalment tornes enrere o navegues al llistat
        this.router.navigate(['../list'], { relativeTo: this.route });
    }

    saveProduct(): void {
        if (this.form.valid) {
            // lògica de guardat
            console.log('Producte guardat');
        }
    }
}
