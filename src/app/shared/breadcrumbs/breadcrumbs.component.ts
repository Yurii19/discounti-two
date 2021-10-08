import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

export interface IRoute {
  title: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {

  history: IRoute[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {

    this.history = this.makeNavigationTree().slice(1);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
       this.history = this.makeNavigationTree().slice(1);
      }
    });
  }

  makeNavigationTree() {
    const currentUrl = this.router.url;
    let paths = currentUrl.split('/');
    const urlTree: IRoute[] = [];
    for (let i = paths.length - 1; i >= 0; i--) {
      const path: IRoute = {
        title: paths[i],
        url: paths.slice(0, i + 1).join('/'),
      };
      urlTree.unshift(path);
    }
    return urlTree;
  }
}
