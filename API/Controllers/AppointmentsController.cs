using System.Collections.Generic;
using API.Entities;
using API.Interfaces;
using API.Params;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentsController : ControllerBase
    {
        private readonly IAppointmentRepository _appointmentRepository;
        private readonly IUserRepository _userRepository;
        public AppointmentsController(IAppointmentRepository appointmentRepository, IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _appointmentRepository = appointmentRepository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Appointment>> GetAllAppointments([FromQuery] string orderBy)
        {
            return _appointmentRepository.GetAllAppointments(orderBy);
        }

        [HttpPost]
        public ActionResult<Appointment> CreateAppointment(CreateAppointmentParams createAppointmentParams)
        {
            var user = _userRepository.GetUser(createAppointmentParams.Username);
            if (user == null) return BadRequest("User does not exist");

            var appointment = _appointmentRepository.CreateAppointment(user.Username, user.FirstName, createAppointmentParams.AppointmentTime);
            if (appointment == null) return BadRequest("Something went wrong");

            return Ok(appointment);
        }

        // [HttpPut]
        // public ActionResult<Appointment> UpdateAppointment()
    }
}