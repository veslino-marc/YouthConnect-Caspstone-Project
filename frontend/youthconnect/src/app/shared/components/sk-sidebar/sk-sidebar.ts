import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sk-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sk-sidebar.html',
  styleUrl: './sk-sidebar.scss',
})
export class SkSidebar {

}
