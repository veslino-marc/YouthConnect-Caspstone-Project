import { Component } from '@angular/core';
import { YouthSidebar } from '../../../shared/components/youth-sidebar/youth-sidebar';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [YouthSidebar],
  templateUrl: './notification.html',
  styleUrl: './notification.scss',
})
export class Notification {

}
