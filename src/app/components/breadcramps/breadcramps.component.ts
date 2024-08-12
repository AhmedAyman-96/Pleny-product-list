import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-breadcramps',
  templateUrl: './breadcramps.component.html',
  styleUrl: './breadcramps.component.scss'
})
export class BreadcrampsComponent {
  breadcrumbs: Array<{ label: string; url: string }> = [];

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.buildBreadcrumb(this.router.url);
      }
    });
  }

  buildBreadcrumb(url: string) {
    const segments = url.split('/').filter(segment => segment);
    this.breadcrumbs = segments.map((segment, index) => {
      return {
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        url: '/' + segments.slice(0, index + 1).join('/')
      };
    });
  }
}