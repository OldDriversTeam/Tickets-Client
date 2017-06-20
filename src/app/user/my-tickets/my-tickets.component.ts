import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.css']
})
export class MyTicketsComponent implements OnInit {

  public myTicketList = [];

  constructor(public authService: AuthService,
  			  public ticketService: TicketService) { }

  ngOnInit() {
  	this.loadData();
  }

  public loadData() {
  	console.log("userId", this.authService.thisUser.id)
  	this.ticketService.getMyTickets(this.authService.thisUser.id).subscribe(res => {
  		if (res && res.ticketList) {
  			this.myTicketList = res.ticketList;
  			console.log("this.myTicketList", this.myTicketList);
  			for (var i = 0; i < this.myTicketList.length; ++i) {
  				let year = this.myTicketList[i].date.substring(0, 4);
  				let month = this.myTicketList[i].date.substring(5, 7);
		        let day = this.myTicketList[i].date.substring(8, 10);
		        if (month[0] === '0') month = month[1];
		        if (day[0] === '0') day = day[1];
		        let hour = this.myTicketList[i].time.substring(0, 2);
        		let minute = this.myTicketList[i].time.substring(3, 5);

        		let time = year + '年' + month + '月' + day + '日 ' + hour + ":" + minute;
        		this.myTicketList[i].parseTime = time;
  			}
  		}
  	})
  }

}
