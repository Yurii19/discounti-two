import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IDiscount } from '../interfaces';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
})
export class TileComponent implements OnInit {
  remoteData: any;
  isEditable: boolean;

  @Output() sendId :EventEmitter<any> = new EventEmitter();
  dropId(){
    this.sendId.emit(this.discount$.id);
  }

  @Input() discount$: IDiscount = {
    id: 1,
    name: 'Discount',
    vendor: 'Discount vendor',
    added: '21-06-2021',
    expired: '21-11-2021',
    location: 'kharkiv',
    tag: 'tag',
    category: 'category',
    isActive: true,
    description: 'string',
    favorite: false,
    percent: '10%',
    image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    coordinates: [[45.094, 34.981]],
  };


  constructor(private router: Router, private route: ActivatedRoute) {
    this.isEditable = this.router.url.includes('vendor')?true: false;
  }

  setDotts(value: string, limit: number): string {
    return value.length < limit ? '' : '...';
  }

  ngOnInit(): void {}

  redirectToDescription(descriptionId: any): void {
    this.router.navigate([`home/${descriptionId}/description`]);
  }

}
