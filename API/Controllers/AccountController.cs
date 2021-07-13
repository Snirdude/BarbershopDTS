using API.Entities;
using API.Interfaces;
using API.Params;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public AccountController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost("register")]
        public ActionResult<AppUser> Register(RegisterParams registerParams)
        {
            if (_userRepository.UserExists(registerParams.Username)) return BadRequest("Username already taken");

            if(_userRepository.CreateUser(registerParams.Username, registerParams.FirstName, registerParams.Password))
                return Ok(_userRepository.GetUser(registerParams.Username));

            return BadRequest("Something went wrong");
        }

        [HttpPost("login")]
        public ActionResult<AppUser> Login(LoginParams loginParams)
        {
            if(_userRepository.AuthenticateUser(loginParams.Username, loginParams.Password))
            {
                return Ok(_userRepository.GetUser(loginParams.Username));
            }

            return BadRequest("Username or password incorrect");
        }
    }
}