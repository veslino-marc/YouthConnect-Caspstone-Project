import { Component } from '@angular/core';
import { SkSidebar } from '../../../shared/components/sk-sidebar/sk-sidebar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SkSidebar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

}
