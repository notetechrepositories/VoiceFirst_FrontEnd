import { Component } from '@angular/core';
import { Router } from '@angular/router';
export interface MenuItem {
  menucode: number;
  menuname: string;
  pageroute: string | null;
  level: number;
  parent: number | null;
  menuorder: number;
  children?: MenuItem[];
  expanded?: boolean;
}

export const MENU_ITEMS: MenuItem[] = [
  { menucode: 1, menuname: 'Administrator', pageroute: null, level: 1, parent: null, menuorder: 1 },
  { menucode: 2, menuname: 'Master', pageroute: null, level: 2, parent: 1, menuorder: 1 },
  { menucode: 3, menuname: 'Transition', pageroute: null, level: 2, parent: 1, menuorder: 2 },
  { menucode: 4, menuname: 'Report', pageroute: null, level: 2, parent: 1, menuorder: 3 },
  { menucode: 5, menuname: 'User Creation', pageroute: '/user', level: 3, parent: 2, menuorder: 1 },
  { menucode: 6, menuname: 'Change Password', pageroute: '/password', level: 3, parent: 2, menuorder: 2 }
];

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  nestedMenu: MenuItem[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.nestedMenu = this.buildTree(MENU_ITEMS, null);
  }

  buildTree(menu: MenuItem[], parentId: number | null): MenuItem[] {
    return menu
      .filter(item => item.parent === parentId)
      .sort((a, b) => a.menuorder - b.menuorder)
      .map(item => ({
        ...item,
        expanded: false,
        children: this.buildTree(menu, item.menucode)
      }));
  }

  navigate(route: string | null) {
    if (route) {
      this.router.navigate([route]);
    }
  }

  toggle(item: MenuItem) {
    if (item.children && item.children.length > 0) {
      item.expanded = !item.expanded;
    } else if (item.pageroute) {
      this.navigate(item.pageroute);
    }
  }
}
