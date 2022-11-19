using Microsoft.AspNetCore.Http;

namespace Core.Utilities.UploadHelper;

public interface IUploadHelper
{
    Task<string> UploadImage(IFormFile file);
    string ImageToBase64String(string path);
}