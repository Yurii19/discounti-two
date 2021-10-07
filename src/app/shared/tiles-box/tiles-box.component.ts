import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DiscountService } from 'src/app/core/services/discount.service';
import { IDiscount } from '../interfaces';

@Component({
  selector: 'app-tiles-box',
  templateUrl: './tiles-box.component.html',
  styleUrls: ['./tiles-box.component.scss'],
})
export class TilesBoxComponent implements OnInit {
  @Output() transitId: EventEmitter<any> = new EventEmitter();
  dropIdFromBox(ev: any) {
    this.transitId.emit(ev);
  }

  @Input() discountsData$: IDiscount[] | null = [];

  transitedId: any;

  constructor(private discountService: DiscountService) {}

  ngOnInit(): void {}
}
