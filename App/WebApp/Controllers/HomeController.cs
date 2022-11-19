using System.Diagnostics;
using System.Text;
using Business.Abstract;
using Core.Utilities.UploadHelper;
using Entities.Concrete;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WebApp.Models;

namespace WebApp.Controllers;

public class HomeController : Controller
{
    private IMarbleService _marbleService;
    private IUploadHelper _uploadHelper;

    public HomeController(IMarbleService marbleService, IUploadHelper uploadHelper)
    {
        _marbleService = marbleService;
        _uploadHelper = uploadHelper;
    }

    public IActionResult Index()
    {
        return View();
    }
    [Route("marbles")]
    public async Task<IActionResult> Marbles()
    {
        var result = await _marbleService.GetAll();
        return View(result);
    }

    [Route("add-marble")]
    public IActionResult AddMarble()
    {
        return View();
    }
    [HttpPost]
    [Route("add-marble")]
    public async Task<IActionResult> AddMarble(AddMarbleViewModel addMarbleViewModel)
    {
        if (!ModelState.IsValid)
        {
            return View(addMarbleViewModel);
        }

        var imageName = await _uploadHelper.UploadImage(addMarbleViewModel.MarbleImageToUpload);
        var imageToPost = @"C:\Users\BERKAY\Desktop\YMH\Dersler\Yazılım Müh Güncel Konular\Proje\Kod\MarbleRecognition\App\WebApp\wwwroot\marble-images\"+imageName;
        GetCheckMarbleViewModel getCheckMarbleColorViewModel;
        using (var client = new HttpClient())
        {
            client.BaseAddress = new Uri("http://127.0.0.1:105");
            HttpContent content = new StringContent(imageToPost, Encoding.UTF8, "application/json");
            var result = await client.PostAsync("/MarbleColorCheck/"+imageToPost,content);
            var colorResultFromModel = await result.Content.ReadAsStringAsync();
            getCheckMarbleColorViewModel = JsonConvert.DeserializeObject<GetCheckMarbleViewModel>(colorResultFromModel);
        }
        GetCheckMarbleViewModel getCheckMarbleSurfaceViewModel;
        using (var client = new HttpClient())
        {
            client.BaseAddress = new Uri("http://127.0.0.1:105");
            HttpContent content = new StringContent(imageToPost, Encoding.UTF8, "application/json");
            var result = await client.PostAsync("/MarbleSurfaceCheck/"+imageToPost,content);
            var colorResultFromModel = await result.Content.ReadAsStringAsync();
            getCheckMarbleSurfaceViewModel = JsonConvert.DeserializeObject<GetCheckMarbleViewModel>(colorResultFromModel);
        }
        var marble = new Marble
        {
            Color = getCheckMarbleColorViewModel.ClassName,
            ColorQuality = getCheckMarbleColorViewModel.ClassQuality,
            Surface = getCheckMarbleSurfaceViewModel.ClassName,
            SurfaceQuality = getCheckMarbleSurfaceViewModel.ClassQuality,
            MarbleImage = imageName,
        };
        await _marbleService.Add(marble);
        return RedirectToAction("AddMarbleSuccess","Home");
    }
    
    [Route("add-marble-success")]
    public IActionResult AddMarbleSuccess()
    {
        return View();
    }

    [Route("marble-detail/{id}")]
    public async Task<IActionResult> MarbleDetail(int id)
    {
        var marble = await _marbleService.GetById(id);
        if (marble==null)
        {
            return RedirectToAction("Index");
        }

        return View(marble);
    }
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}