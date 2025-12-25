import { LayoutService } from '@/layout/service/layout.service';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-detail-demo',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, InputTextModule],
    template: `
        <ng-template #topbarExtra>
            <div class="flex align-items-center">
                <input pInputText type="text" [formControl]="searchControl" placeholder="Buscar..." class="p-inputtext-sm" />
                <small *ngIf="searchControl.invalid" class="p-error">Requerido</small>
            </div>
        </ng-template>

        <div class="card">
            <h5>Contenido de la página de detalle</h5>
        </div>
    `
})
export class DetailDemo implements AfterViewInit, OnDestroy {
    @ViewChild('topbarExtra') topbarExtra!: TemplateRef<any>;

    // 1. Aquí defines el control con sus validaciones
    searchControl = new FormControl('', [Validators.minLength(3)]);

    constructor(private layoutService: LayoutService) {}

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
}
