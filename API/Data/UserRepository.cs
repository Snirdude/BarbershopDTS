using System.Linq;
using API.Entities;
using API.Interfaces;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public bool AuthenticateUser(string username, string password)
        {
            if(!UserExists(username)) return false;

            return _context.Users.Single(x => x.Username.Equals(username.ToLower()))
                .Password.Equals(password);
        }

        public bool CreateUser(string username, string firstName, string password)
        {
            _context.Users.Add(new AppUser
            {
                Username = username.ToLower(),
                FirstName = firstName,
                Password = password,
            });

            return _context.SaveChanges() > 0;
        }

        public AppUser GetUser(string username)
        {
            return _context.Users.SingleOrDefault(x => x.Username.Equals(username.ToLower()));
        }

        public bool UserExists(string username)
        {
            return _context.Users.Any(user => user.Username.Equals(username.ToLower()));
        }
    }
}