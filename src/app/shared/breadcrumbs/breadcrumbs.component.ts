import { Component, OnInit } from '@angular/core';
import {
  NavigationEnd,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  history: string [] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.history.push( this.router.url);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const arrOfPaths = this.router.url.split('/');
    this.history = arrOfPaths.filter(el => el);
    console.log(arrOfPaths)
      }
    });

    
  }

}
