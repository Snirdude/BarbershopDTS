using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        bool UserExists(string username);

        bool CreateUser(string username, string firstName, string password);

        bool AuthenticateUser(string username, string password);

        AppUser GetUser(string username);
    }
}