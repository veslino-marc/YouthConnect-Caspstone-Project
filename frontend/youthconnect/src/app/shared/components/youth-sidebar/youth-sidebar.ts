import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-youth-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './youth-sidebar.html',
  styleUrl: './youth-sidebar.scss',
})
export class YouthSidebar {

}
