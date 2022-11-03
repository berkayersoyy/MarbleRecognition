using System.Security.Claims;
using Business.Abstract;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Caching;
using Core.Aspects.Autofac.Logging;
using Core.Aspects.Autofac.Validation;
using Core.CrossCuttingConcerns.Logging.Log4Net.Loggers;
using Core.Entities.Concrete;
using DataAccess.Abstract;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.JsonWebTokens;

namespace Business.Concrete;

[LogAspect(typeof(FileLogger))]
public class UserManager:IUserService
{
    private IUserRepository _userRepository;
    private UserManager<User> _userManager;

    public UserManager(IUserRepository userRepository, UserManager<User> userManager)
    {
        _userRepository = userRepository;
        _userManager = userManager;
    }
    [CacheAspect()]
    public async Task<List<User>> GetAll()
    {
        var result= await _userRepository.GetList();
        return result.ToList();
    }

    public async Task<User> GetById(int id)
    {
        var result = await _userRepository.Get(x => x.Id == id);
        return result;
    }

    public async Task<User> GetByMail(string email)
    {
        var result = await _userRepository.Get(x => x.Email.ToLower() == email.ToLower());
        if (result==null)
        {
            return null;
        }

        return result;
    }
    [ValidationAspect(typeof(UserValidator))]
    [CacheRemoveAspect("IUserService.Get")]
    public async Task Add(User user)
    {
        user.UserName = user.Email;
        user.SecurityStamp = Guid.NewGuid().ToString();
        await _userRepository.Add(user);
        
        var claims = new List<Claim>();
        claims.Add(new Claim(ClaimTypes.Name,user.Email));
        claims.Add(new Claim(ClaimTypes.Role,"User"));
        claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
        await _userManager.AddClaimsAsync(user, claims);
    }
    [ValidationAspect(typeof(UserValidator))]
    [CacheRemoveAspect("IUserService.Get")]
    public async Task Update(User user)
    {
        await _userRepository.Update(user);
    }
    [CacheRemoveAspect("IUserService.Get")]
    public async Task Delete(User user)
    {
        await _userRepository.Delete(user);
    }
}