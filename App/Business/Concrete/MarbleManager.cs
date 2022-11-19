using System.Security.Claims;
using Business.Abstract;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Caching;
using Core.Aspects.Autofac.Logging;
using Core.Aspects.Autofac.Validation;
using Core.CrossCuttingConcerns.Logging.Log4Net.Loggers;
using Core.Entities.Concrete;
using DataAccess.Abstract;
using Entities.Concrete;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.JsonWebTokens;

namespace Business.Concrete;

[LogAspect(typeof(FileLogger))]
public class MarbleManager:IMarbleService
{
    private IMarbleRepository _marbleRepository;
    private IAuthService _authService;

    public MarbleManager(IMarbleRepository marbleRepository, IAuthService authService)
    {
        _marbleRepository = marbleRepository;
        _authService = authService;
    }
    [CacheAspect()]
    public async Task<List<Marble>> GetAll()
    {
        var result= await _marbleRepository.GetList();
        return result.ToList();
    }

    public async Task<Marble> GetById(int id)
    {
        var result = await _marbleRepository.Get(x => x.Id == id);
        return result;
    }
    
    [CacheRemoveAspect("IMarbleService.Get")]
    public async Task Add(Marble marble)
    {
        var currentUser = await _authService.GetCurrentUser();
        int userId = -1;
        if (currentUser!=null)
        {
            userId = currentUser.Id;
        }

        marble.OwnerId = userId;
        marble.QualityClass = CalculateMarbleQuality(float.Parse(marble.SurfaceQuality));
        marble.MarbleIcon = GetMarbleIcon(float.Parse(marble.SurfaceQuality));
        await _marbleRepository.Add(marble);
    }
    [CacheRemoveAspect("IMarbleService.Get")]
    public async Task Update(Marble marble)
    {
        await _marbleRepository.Update(marble);
    }
    [CacheRemoveAspect("IMarbleService.Get")]
    public async Task Delete(Marble marble)
    {
        await _marbleRepository.Delete(marble);
    }

    public string CalculateMarbleQuality(float quality)
    {
        if (quality>=90)
        {
            return "A+";
        }else if (quality >= 80)
        {
            return "A";
        }else if (quality >= 70)
        {
            return "B+";
        }else if (quality >= 60)
        {
            return "B";
        }else if (quality>=45)
        {
            return "C+";
        }else if (quality>=30)
        {
            return "C";
        }
        else
        {
            return "D";
        }
    }
    public string GetMarbleIcon(float quality)
    {
        if (quality>=90)
        {
            return "<i class='fa-solid fa-a'></i><i class='fa-solid fa-plus'></i>";
        }else if (quality >= 80)
        {
            return "<i class='fa-solid fa-a'></i>";
        }else if (quality >= 70)
        {
            return "<i class='fa-solid fa-b'></i><i class='fa-solid fa-plus'></i>";
        }else if (quality >= 60)
        {
            return "<i class='fa-solid fa-b'></i>";
        }else if (quality>=45)
        {
            return "<i class='fa-solid fa-c'></i><i class='fa-solid fa-plus'></i>";
        }else if (quality>=30)
        {
            return "<i class='fa-solid fa-c'></i>";
        }
        else
        {
            return "<i class='fa-solid fa-d'></i>";
        }
    }
}