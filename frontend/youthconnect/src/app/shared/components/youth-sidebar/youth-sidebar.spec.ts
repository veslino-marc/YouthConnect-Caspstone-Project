import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YouthSidebar } from './youth-sidebar';

describe('YouthSidebar', () => {
  let component: YouthSidebar;
  let fixture: ComponentFixture<YouthSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YouthSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YouthSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
