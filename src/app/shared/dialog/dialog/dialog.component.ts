import {ChangeDetectorRef, Component, Inject, Input} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef,
  ComponentRef
} from "@angular/core";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent {
  @ViewChild('renderComponentHere', { read: ViewContainerRef })//load child component
  vcRef!: ViewContainerRef;

  componentRef!: ComponentRef<any>;
  loading = true;
  marker:any;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private resolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.marker = [{ cords:[50.4501, 30.5234], text: 'This is Kyiv'},]
  }

  ngAfterViewInit() {
   // const comp = this.resolver.resolveComponentFactory(this.data.component);
    //this.componentRef = this.vcRef.createComponent(comp);
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
