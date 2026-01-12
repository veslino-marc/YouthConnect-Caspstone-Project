import { Component } from '@angular/core';
import { SkSidebar } from '../../../shared/components/sk-sidebar/sk-sidebar';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [SkSidebar],
  templateUrl: './create-event.html',
  styleUrl: './create-event.scss',
})
export class CreateEvent {

}
