import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { CommentsService } from './comments.service';
import { CommentItem } from '../models/commentItem.model'

describe('CommentsService', () => {
  let service: CommentsService, httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentsService]
    });
    service = TestBed.get(CommentsService);
    httpMock = TestBed.get(HttpTestingController)
  });

  afterEach(()=>{
    httpMock.verify()
  })

  it('should fetch all comments', () => {
    let testComments: CommentItem[] = [
      {
        postid: "1",
        id: "5",
        "name": "vero eaque aliquid doloribus et culpa",
        "email": "Hayden@althea.biz",
        "body": "harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et"
      },
      {
        postid: "2",
        id: "6",
        "name": "et fugit eligendi deleniti quidem qui sint nihil autem",
        "email": "Presley.Mueller@myrl.com",
        "body": "doloribus at sed quis culpa deserunt consectetur qui praesentium\naccusamus fugiat dicta\nvoluptatem rerum ut voluptate autem\nvoluptatem repellendus aspernatur dolorem in"
      }
    ]

    service.getCommentItems().subscribe(comments => {
      expect(comments.length).toBe(2)
      expect(comments).toEqual(testComments)
    })
    const request = httpMock.expectOne(`${service.uri}`)
    expect(request.request.method).toBe('GET');
    request.flush(testComments);

  })

  it('should create new Comment', () => {
    let newComment: CommentItem = {
      postid: "2",
      id: "6",
      "name": "et fugit eligendi deleniti quidem qui sint nihil autem",
      "email": "Presley.Mueller@myrl.com",
      "body": "doloribus at sed quis culpa deserunt consectetur qui praesentium\naccusamus fugiat dicta\nvoluptatem rerum ut voluptate autem\nvoluptatem repellendus aspernatur dolorem in"
    }
    service.addCommentItem(newComment).subscribe(comments => { comments })
    const request = httpMock.expectOne(`${service.uri}`)
    expect(request.request.method).toBe('POST');
  })

  it('should delete Comment', () => {
    let id = '1';
    service.deleteCommentItem(id).subscribe(comments => { })
    const request = httpMock.expectOne(`${service.uri}/${id}`)
    expect(request.request.method).toBe('DELETE')
  })



  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
