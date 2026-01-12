import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkSidebar } from './sk-sidebar';

describe('SkSidebar', () => {
  let component: SkSidebar;
  let fixture: ComponentFixture<SkSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
