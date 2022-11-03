using System.Security.Claims;
using Business.Abstract;
using Business.Constants;
using Core.Entities.Concrete;
using Entities.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace Business.Concrete;

public class AuthManager:IAuthService
{
    private IPasswordHasher<User> _passwordHasher;
    private UserManager<User> _userManager;
    private SignInManager<User> _signInManager;
    private IUserService _userService;
    private IHttpContextAccessor _httpContextAccessor;

    public AuthManager(IPasswordHasher<User> passwordHasher, UserManager<User> userManager, SignInManager<User> signInManager, IUserService userService, IHttpContextAccessor httpContextAccessor)
    {
        _passwordHasher = passwordHasher;
        _userManager = userManager;
        _signInManager = signInManager;
        _userService = userService;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<Result> Register(UserRegisterDto userRegisterDto)
    {
        var userToFindByEmail = await CheckUserExistsByEmail(userRegisterDto.Email);
        if (userToFindByEmail!=null)
        {
            return new Result
            {
                Message = Messages.UserExistsByEmail,
                Success = false,
            };
        }
        var userToFindByNickname = await CheckUserExistsByNickname(userRegisterDto.Nickname);
        if (userToFindByNickname!=null)
        {
            return new Result
            {
                Message = Messages.UserExistsByUsername,
                Success = false,
            };
        }
        var user = new User
        {
            Email = userRegisterDto.Email,
            Nickname = userRegisterDto.Nickname
        };
        var hashedPassword = _passwordHasher.HashPassword(user, userRegisterDto.Password);
        user.PasswordHash = hashedPassword;
        await _userService.Add(user);
        return new Result
        {
           Message = Messages.RegisterSuccessfully,
           Success = true
        };
    }
    
    public async Task<Result> Login(UserLoginDto userLoginDto)
    {
        var userToFind = await CheckUserExistsByEmail(userLoginDto.Email);
        if (userToFind==null)
        {
            return new Result
            {
                Message = Messages.UserNotFound,
                Success = false,
            };
        }
        var verifyPassword = _passwordHasher.VerifyHashedPassword(userToFind,userToFind.PasswordHash,userLoginDto.Password);
        if (verifyPassword == PasswordVerificationResult.Failed)
        {
            return new Result
            {
                Message = Messages.WrongPassword,
                Success = false,
            };
        }
        await _signInManager.PasswordSignInAsync(userToFind, userLoginDto.Password, true, false);
        return new Result
        {
            Message = Messages.LoginSuccessfully,
            Success = true,
        };
    }

    public async Task Logout()
    {
        await _signInManager.SignOutAsync();
    }
    public async Task<User> CheckUserExistsByEmail(string email)
    {
        var userToFind = await _userManager.FindByEmailAsync(email);
        if (userToFind==null)
        {
            return null;
        }

        return userToFind;
    }
    public async Task<User> CheckUserExistsByNickname(string nickname)
    {
        var userToFind =
            (await _userService.GetAll()).SingleOrDefault(x =>
                x.Nickname.Trim().ToLower()==nickname.Trim().ToLower());
        if (userToFind==null)
        {
            return null;
        }

        return userToFind;
    }

    public async Task<User?> GetCurrentUser()
    {
        var userIdString = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (String.IsNullOrEmpty(userIdString))
        {
            return null;
        }
        var userToGet = await _userManager.FindByIdAsync(userIdString);
        if (userToGet==null)
        {
            return null;
        }

        return userToGet;
    }
}