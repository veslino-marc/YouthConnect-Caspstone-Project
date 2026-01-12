import { Component } from '@angular/core';
import { YouthSidebar } from '../../../shared/components/youth-sidebar/youth-sidebar';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [YouthSidebar],
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class Events {

}
