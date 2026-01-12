import { Component } from '@angular/core';
import { YouthSidebar } from '../../../shared/components/youth-sidebar/youth-sidebar';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConcernService } from '../../../services/concern.service';
import { ConcernDTO } from '../../../models/concern.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-concern',
  imports: [FormsModule, CommonModule, YouthSidebar],
  templateUrl: './create-concern.html',
  styleUrl: './create-concern.scss',
})
export class CreateConcern {
}