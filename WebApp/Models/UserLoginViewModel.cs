using System.ComponentModel.DataAnnotations;

namespace WebApp.Models;

public class UserLoginViewModel
{
    [Required(ErrorMessage = "Eposta adresi boş bırakılamaz")]
    [DataType(DataType.EmailAddress,ErrorMessage = "Geçersiz eposta adresi")]
    [RegularExpression(@"^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$", ErrorMessage = "Geçersiz eposta adresi")]
    public string Email { get; set; }
    [Required(ErrorMessage = "Şifre boş bırakılamaz")]
    [DataType(DataType.Password)]
    public string Password { get; set; }

    public bool RememberMe { get; set; }
}