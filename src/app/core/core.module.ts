import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { NotificationService } from './services/notification.service';

export {
  NotificationService,
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  providers: []
})
export class CoreModule { }
