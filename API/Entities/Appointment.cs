using System;

namespace API.Entities
{
    public class Appointment
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime AppointmentTime { get; set; }
    }
}