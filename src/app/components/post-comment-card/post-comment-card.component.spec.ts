import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCommentCardComponent } from './post-comment-card.component';

describe('PostCommentCardComponent', () => {
  let component: PostCommentCardComponent;
  let fixture: ComponentFixture<PostCommentCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCommentCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCommentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
