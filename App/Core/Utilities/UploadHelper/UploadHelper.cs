using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace Core.Utilities.UploadHelper;

public class UploadHelper:IUploadHelper
{
    private IHostingEnvironment _hostEnvironment;

    public UploadHelper(IHostingEnvironment hostEnvironment)
    {
        _hostEnvironment = hostEnvironment;
    }

    public async Task<string> UploadImage(IFormFile file)
    {
        string uniqueFileName = null;
        if (file!=null)
        {
            string uploadFolder = Path.Combine(_hostEnvironment.WebRootPath, "marble-images");
            uniqueFileName = Guid.NewGuid().ToString() + "-" + file.FileName;
            string filePath = Path.Combine(uploadFolder, uniqueFileName);
            using (var fileStream = new FileStream(filePath,FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }
            return uniqueFileName;
        }
        return "";
    }

    public string ImageToBase64String(string path)
    {
        byte[] imageArray = File.ReadAllBytes(path);
        string base64ImageRepresentation = Convert.ToBase64String(imageArray);
        return base64ImageRepresentation;
    }
}