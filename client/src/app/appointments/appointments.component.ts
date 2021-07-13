import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { ModalDismissReasons, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from '../_models/appointment';
import { AccountService } from '../_services/account.service';
import { AppointmentsService } from '../_services/appointments.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  appointments: Appointment[] = [];
  username: string;
  userHasAppointment: boolean;
  closeResult = '';
  modalTitle: string;
  faCalendar = faCalendar;
  appointmentTime = {hour: 0, minute: 0};
  appointmentDate: NgbDateStruct;
  firstName: string;

  constructor(private appointmentsService: AppointmentsService, private accountService: AccountService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(user => {
      this.username = user.username;
      this.firstName = user.firstName;
    });

    this.appointmentsService.getAllAppointments('').subscribe(appointments => {
      if(appointments) {
        this.appointments = appointments;
      }
    });

    this.userHasAppointment = this.appointments.some(x => x.username === this.username);
  }

  addAppointment(modal){
    this.modalTitle = 'Add Appointment';
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // this.appointmentsService.
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }
}
