namespace WebApp.Models;

public class AddMarbleViewModel
{
    public string? Color { get; set; }
    public float? Quality { get; set; }
    public int? OwnerId { get; set; }
    public string? MarbleImage { get; set; }
    public IFormFile MarbleImageToUpload { get; set; }
}