import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayTopComponent } from './play-top.component';

describe('PlayTopComponent', () => {
  let component: PlayTopComponent;
  let fixture: ComponentFixture<PlayTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
