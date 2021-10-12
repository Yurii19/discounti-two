import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminContainerComponent } from './admin-container/admin-container.component';

@NgModule({
  declarations: [AdminComponent, AdminContainerComponent],
  imports: [CommonModule, SharedModule],
  exports: [AdminComponent, SharedModule, AdminContainerComponent],
})
export class AdminModule {}
