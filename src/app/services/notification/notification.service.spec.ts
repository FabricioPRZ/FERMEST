import { TestBed } from '@angular/core/testing';

import { NotificationService1} from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService1;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService1);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
