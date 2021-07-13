import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { ModalDismissReasons, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from '../_models/appointment';
import { User } from '../_models/user';
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
  faChevron;
  appointmentTime = { hour: 0, minute: 0 };
  appointmentDate: NgbDateStruct;
  firstName: string;
  createdDate: Date;
  sortNamesDirection = '';
  sortTimesDirection = '';
  modalDisabled: boolean;
  modalButtonText: string;
  user: User;
  minDate: NgbDateStruct = { year: new Date(Date.now()).getFullYear(), month: new Date(Date.now()).getMonth() + 1, day: new Date(Date.now()).getDate()}

  constructor(private appointmentsService: AppointmentsService, private accountService: AccountService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(user => {
      this.user = user;
      this.username = user.username;
      this.firstName = user.firstName;
    });

    this.getAppointments('');
  }

  getAppointments(orderBy: string) {
    this.appointmentsService.getAllAppointments(orderBy).subscribe(appointments => {
      if (appointments) {
        this.appointments = appointments;
      }

      this.userHasAppointment = this.appointments.some(x => x.username === this.username.toLowerCase());
    });
  }

  addAppointment(modal) {
    this.modalTitle = 'Add Appointment';
    this.modalDisabled = false;
    this.modalButtonText = 'Save';
    this.firstName = this.user.firstName;
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      let time: Date = new Date(this.appointmentDate.year, this.appointmentDate.month - 1, this.appointmentDate.day, this.appointmentTime.hour, this.appointmentTime.minute);
      this.appointmentsService.createAppointment(this.username, time).subscribe(response => {
        this.appointments.push(response);
        this.userHasAppointment = this.appointments.some(x => x.username === this.username);
      });
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  deleteAppointment() {
    this.appointmentsService.deleteAppointment(this.username).subscribe(response => {
      this.getAppointments('');
    });
  }

  editAppointment(modal, appointmentClicked: Appointment) {
    this.modalTitle = 'Edit Appointment';
    if(appointmentClicked){
      this.modalDisabled = !(appointmentClicked.username === this.username);
      this.firstName = appointmentClicked.name;
      this.createdDate = appointmentClicked.createdTime;
      let tempDate = new Date(appointmentClicked.appointmentTime);
      this.appointmentDate = {
        year: tempDate.getFullYear(),
        month: tempDate.getMonth() + 1,
        day: tempDate.getDate(),
      }
      this.appointmentTime = {
        hour: tempDate.getHours(),
        minute: tempDate.getMinutes(),
      }
    }
    else{
      this.modalDisabled = false;
      let appointment = this.appointments.find(a => a.username === this.username);
      let tempDate = new Date(appointment.appointmentTime)
      this.appointmentDate = {
        year: tempDate.getFullYear(),
        month: tempDate.getMonth() + 1,
        day: tempDate.getDate()
      };
      this.appointmentTime = {
        hour: tempDate.getHours(),
        minute: tempDate.getMinutes()
      };

      this.createdDate = appointment.createdTime;
    }

    this.modalButtonText = this.modalDisabled ? 'Close' : 'Save';

    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if(!this.modalDisabled){
        let time: Date = new Date(this.appointmentDate.year, this.appointmentDate.month - 1, this.appointmentDate.day, this.appointmentTime.hour, this.appointmentTime.minute);
        this.appointmentsService.editAppointment(this.username, time).subscribe(response => {

          this.getAppointments('');
        });
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  sortNames() {
    this.sortTimesDirection = '';
    this.sortNamesDirection = this.sortNamesDirection === '' ? 'name' : this.sortNamesDirection === 'name' ? 'nameDesc' : '';
    this.faChevron = this.sortNamesDirection === 'name' ? faChevronDown : this.sortNamesDirection === 'nameDesc' ? faChevronUp : '';
    this.getAppointments(this.sortNamesDirection);
  }

  sortTimes() {
    this.sortNamesDirection = '';
    this.sortTimesDirection = this.sortTimesDirection === '' ? 'date' : this.sortTimesDirection === 'date' ? 'dateDesc' : '';
    this.faChevron = this.sortTimesDirection === 'date' ? faChevronDown : this.sortTimesDirection === 'dateDesc' ? faChevronUp : '';
    this.getAppointments(this.sortTimesDirection);
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
