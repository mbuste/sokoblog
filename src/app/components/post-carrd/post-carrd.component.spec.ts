import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCarrdComponent } from './post-carrd.component';

describe('PostCarrdComponent', () => {
  let component: PostCarrdComponent;
  let fixture: ComponentFixture<PostCarrdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCarrdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCarrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
