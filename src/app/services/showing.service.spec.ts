import { TestBed, inject } from '@angular/core/testing';

import { ShowingService } from './showing.service';

describe('ShowingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowingService]
    });
  });

  it('should ...', inject([ShowingService], (service: ShowingService) => {
    expect(service).toBeTruthy();
  }));
});
