import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponentCardComponent } from './post-component-card.component';

describe('PostComponentCardComponent', () => {
  let component: PostComponentCardComponent;
  let fixture: ComponentFixture<PostComponentCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostComponentCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
