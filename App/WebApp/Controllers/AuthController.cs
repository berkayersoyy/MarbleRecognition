using System.Security.Claims;
using System.Text;
using Business.Abstract;
using Core.Entities.Concrete;
using Core.Utilities.EmailHelper;
using Entities.Dto;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using WebApp.Models;

namespace WebApp.Controllers;

public class AuthController : Controller
{
    private IAuthService _authService;
    private IHttpContextAccessor _httpContextAccessor;
    private UserManager<User> _userManager;
    private IEmailService _emailService;

    public AuthController(IAuthService authService, IHttpContextAccessor httpContextAccessor, UserManager<User> userManager, IEmailService emailService)
    {
        _authService = authService;
        _httpContextAccessor = httpContextAccessor;
        _userManager = userManager;
        _emailService = emailService;
    }
    [Route("login")]
    public IActionResult Login()
    {
        return View();
    }
    [Route("login")]
    [HttpPost]
    public async Task<IActionResult> Login(UserLoginViewModel model)
    {
        if (!ModelState.IsValid)
        {
            return View(model);
        }
        var userLoginDto = new UserLoginDto
        {
            Email = model.Email,
            Password = model.Password
        };
        var loginResult = await _authService.Login(userLoginDto);
        if (!loginResult.Success)
        {
            ModelState.AddModelError("Login",loginResult.Message);
            return View(model);
        }

        return RedirectToAction("Marbles", "Home");
    }
    [Route("register")]
    public IActionResult Register()
    {
        return View();
    }
    [Route("sregisterignup")]
    [HttpPost]
    public async Task<IActionResult> Register(UserRegisterViewModel userRegisterViewModel)
    {
        if (!ModelState.IsValid)
        {
            return View(userRegisterViewModel);
        }
        var userRegisterDto = new UserRegisterDto
        {
            Email = userRegisterViewModel.Email,
            Nickname = userRegisterViewModel.Nickname,
            Password = userRegisterViewModel.Password
        };
        var result = await _authService.Register(userRegisterDto);
        if (!result.Success)
        {
            return View(userRegisterViewModel);
        }

        var userLoginDto = new UserLoginDto
        {
            Email = userRegisterViewModel.Email,
            Password = userRegisterViewModel.Password
        };
        var loginResult = await _authService.Login(userLoginDto);
        if (!loginResult.Success)
        {
            return RedirectToAction("Login", "Auth");
        }
        return RedirectToAction("Marbles", "Home");
    }
    [HttpPost]
    public async Task<bool> RegisterPopup(UserRegisterViewModel userRegisterViewModel)
    {
        if (!ModelState.IsValid)
        {
            return false;
        }
        var userRegisterDto = new UserRegisterDto
        {
            Email = userRegisterViewModel.Email,
            Nickname = userRegisterViewModel.Nickname,
            Password = userRegisterViewModel.Password
        };
        var result = await _authService.Register(userRegisterDto);
        if (!result.Success)
        {
            return false;
        }

        var userLoginDto = new UserLoginDto
        {
            Email = userRegisterViewModel.Email,
            Password = userRegisterViewModel.Password
        };
        var loginResult = await _authService.Login(userLoginDto);
        if (!loginResult.Success)
        {
            return false;
        }

        return true;
    }
    [HttpGet]
    public async Task<bool> CheckUserExistsByEmail(string email)
    {
        var result = await _authService.CheckUserExistsByEmail(email);
        return result==null;
    }
    [HttpGet]
    public async Task<bool> CheckUserExistsByNickname(string nickname)
    {
        var result = await _authService.CheckUserExistsByNickname(nickname);
        return result==null;
    }
    
    [HttpGet]
    public int? GetCurrentUserId()
    {
        var userIdString = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (String.IsNullOrEmpty(userIdString))
        {
            return null;
        }
        return int.Parse(userIdString);
    }

    [HttpGet]
    public async Task<User?> GetCurrentUser()
    {
        return await _authService.GetCurrentUser();
    }
    
    public async Task Logout()
    {
        await _authService.Logout();
    }

    [Route("forgot-password")]
    public IActionResult ForgotPassword()
    {
        return View();
    }
    [HttpPost]
    [ValidateAntiForgeryToken]
    [Route("forgot-password")]
    public async Task<IActionResult> ForgotPassword(ForgotPasswordViewModel forgotPasswordViewModel)
    {
        if (!ModelState.IsValid)
            return View(forgotPasswordViewModel);
        var user = await _userManager.FindByEmailAsync(forgotPasswordViewModel.Email);
        if (user == null)
        {
            ModelState.AddModelError("ForgotPassword","Kullanıcı bulunamadı");
            return View(forgotPasswordViewModel);
        }
        var token = await _userManager.GeneratePasswordResetTokenAsync(user);
        var encodedToken = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));
        var callback = Url.Action(nameof(ResetPassword), "Auth", new { token=encodedToken, email = user.Email }, Request.Scheme);
        var message = new EmailMessage(new string[] { user.Email }, "Oppio","Oppio Şifre Sıfırlama Bağlantısı", callback);
        _emailService.SendEmail(message);
        return RedirectToAction("ForgotPasswordConfirmation","Auth");
    }
    [Route("forgot-password-confirmation")]
    public IActionResult ForgotPasswordConfirmation()
    {
        return View();
    }
    [Route("reset-password")]
    public IActionResult ResetPassword(string token, string email)
    {
        if (String.IsNullOrEmpty(token)||String.IsNullOrEmpty(email))
        {
            return RedirectToAction("ForgotPassword", "Auth");
        }
        var resetPasswordViewModel = new ResetPasswordViewModel
        {
            Email = email,
            Token = token
        };
        return View(resetPasswordViewModel);
    }
    [HttpPost]
    [ValidateAntiForgeryToken]
    [Route("reset-password")]
    public async Task<IActionResult> ResetPassword(ResetPasswordViewModel resetPasswordViewModel)
    {
        if (!ModelState.IsValid)
            return View(resetPasswordViewModel);
        var user = await _userManager.FindByEmailAsync(resetPasswordViewModel.Email);
        if (user == null)
        {
            return RedirectToAction("ForgotPassword","Auth");
        }

        var decodedToken = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(resetPasswordViewModel.Token));
        var resetPassResult = await _userManager.ResetPasswordAsync(user, decodedToken, resetPasswordViewModel.Password);
        if(!resetPassResult.Succeeded)
        {
            return View(resetPasswordViewModel);
        }

        await _userManager.ChangePasswordAsync(user, user.PasswordHash, resetPasswordViewModel.Password);
        return RedirectToAction("ResetPasswordConfirmation","Auth");
    }
    [Route("reset-password-confirmation")]
    public IActionResult ResetPasswordConfirmation()
    {
        return View();
    }
}