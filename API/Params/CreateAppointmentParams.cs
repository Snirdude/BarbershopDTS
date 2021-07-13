using System;

namespace API.Params
{
    public class CreateAppointmentParams
    {
        public string Username { get; set; }
        public DateTime AppointmentTime { get; set; }
    }
}