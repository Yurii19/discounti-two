import { Component, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// interface Category {
//   name: string;
//   id: number;
//   selected: false;
// }

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})

export class CheckboxComponent implements OnInit {
  
  constructor(private http: HttpClient) {}
  
  categories: any;

  ngOnInit() {
      this.http.get<any>('http://localhost:8080/categories').subscribe((data) => {
        this.categories = data;
      });
  }
}