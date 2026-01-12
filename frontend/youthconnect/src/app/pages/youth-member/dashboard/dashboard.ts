import { Component } from '@angular/core';
import { YouthSidebar } from '../../../shared/components/youth-sidebar/youth-sidebar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [YouthSidebar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

}
