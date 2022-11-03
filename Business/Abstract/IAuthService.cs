using Core.Entities.Concrete;
using Entities.Dto;

namespace Business.Abstract;

public interface IAuthService
{
    Task<Result> Register(UserRegisterDto userRegisterDto);
    Task<Result> Login(UserLoginDto userLoginDto);
    Task Logout();
    Task<User> CheckUserExistsByNickname(string nickname);
    Task<User> CheckUserExistsByEmail(string email);
    Task<User?> GetCurrentUser();
}