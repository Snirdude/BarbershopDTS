using System;
using System.Collections.Generic;
using System.Linq;
using API.Entities;
using API.Interfaces;

namespace API.Data
{
    public class AppointmentRepository : IAppointmentRepository
    {
        private readonly DataContext _context;
        public AppointmentRepository(DataContext context)
        {
            _context = context;
        }

        public Appointment CreateAppointment(string username, string name, DateTime appointmentTime)
        {
            _context.Appointments.Add(new Appointment
            {
                Username = username.ToLower(),
                Name = name,
                CreatedTime = DateTime.Now,
                AppointmentTime = appointmentTime.ToLocalTime()
            });

            _context.SaveChanges();

            return GetAppointment(username);
        }

        public bool DeleteAppointment(string username)
        {
            var appointment = GetAppointment(username);
            _context.Remove(appointment);

            return _context.SaveChanges() > 0;
        }

        public List<Appointment> GetAllAppointments(string orderBy)
        {
            var query = _context.Appointments.AsQueryable();
            switch (orderBy)
            {
                case "nameDesc":
                    query = query.OrderByDescending(x => x.Name);
                    break;
                case "name":
                    query = query.OrderBy(x => x.Name);
                    break;
                case "dateDesc":
                    query = query.OrderByDescending(x => x.AppointmentTime);
                    break;
                case "date":
                    query = query.OrderBy(x => x.AppointmentTime);
                    break;
                default:
                    break;
            }

            return query.ToList();
        }

        public Appointment GetAppointment(string username)
        {
            return _context.Appointments.SingleOrDefault(x => x.Username.Equals(username.ToLower()));
        }

        public bool UpdateAppointment(string username, DateTime appointmentTime)
        {
            _context.Appointments.Single(x => x.Username.ToLower().Equals(username.ToLower())).AppointmentTime = appointmentTime.ToLocalTime();

            return _context.SaveChanges() > 0;
        }
    }
}