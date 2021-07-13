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

        [HttpGet("{orderBy?}")]
        public ActionResult<IEnumerable<Appointment>> GetAllAppointments(string orderBy)
        {
            return _appointmentRepository.GetAllAppointments(orderBy);
        }

        [HttpPost]
        public ActionResult<Appointment> CreateAppointment(CreateAppointmentParams createAppointmentParams)
        {
            var user = _userRepository.GetUser(createAppointmentParams.Username);
            if (user == null) return BadRequest("User does not exist");

            var appointment = _appointmentRepository.CreateAppointment(user.Username, user.FirstName, createAppointmentParams.AppointmentTime);
            if (appointment == null) return BadRequest("Request Failed");

            return Ok(appointment);
        }

        [HttpDelete("{username}")]
        public ActionResult DeleteAppointment(string username)
        {
            if (_appointmentRepository.DeleteAppointment(username))
                return Ok();
            return BadRequest("Request Failed");
        }

        [HttpPut]
        public ActionResult<Appointment> EditAppointment(EditAppointmentParams editAppointmentParams)
        {
            _appointmentRepository.UpdateAppointment(editAppointmentParams.Username, editAppointmentParams.AppointmentTime);

            return Ok(_appointmentRepository.GetAppointment(editAppointmentParams.Username));
        }
    }
}