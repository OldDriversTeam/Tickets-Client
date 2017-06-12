import { TestBed, inject } from '@angular/core/testing';

import { TicketService } from './ticket.service';

describe('TicketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TicketService]
    });
  });

  it('should ...', inject([TicketService], (service: TicketService) => {
    expect(service).toBeTruthy();
  }));
});
