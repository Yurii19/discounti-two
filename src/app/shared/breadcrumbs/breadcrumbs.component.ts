import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  history: any = 'History';

  constructor(private router : Router ) { }

  ngOnInit(): void {
    console.log('Router', this.router.config)
  }

}
