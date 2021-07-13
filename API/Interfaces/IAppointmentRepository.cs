using System;
using System.Collections.Generic;
using API.Entities;

namespace API.Interfaces
{
    public interface IAppointmentRepository
    {
        List<Appointment> GetAllAppointments(string orderBy);

        Appointment CreateAppointment(string username, string name, DateTime appointmentTime);

        Appointment GetAppointment(string username);

        bool DeleteAppointment(string username);

        bool UpdateAppointment(string username, DateTime appointmentTime);
    }
}