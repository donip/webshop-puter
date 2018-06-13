import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsteadPptComponent } from './instead-ppt.component';

describe('InsteadPptComponent', () => {
  let component: InsteadPptComponent;
  let fixture: ComponentFixture<InsteadPptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsteadPptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsteadPptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
