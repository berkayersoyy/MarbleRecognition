using System.ComponentModel.DataAnnotations;

namespace WebApp.Models;

public class ForgotPasswordViewModel
{
    [Required(ErrorMessage = "Eposta adresi boş bırakılamaz")]
    [DataType(DataType.EmailAddress,ErrorMessage = "Geçersiz eposta adresi")]
    [RegularExpression(@"^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$", ErrorMessage = "Geçersiz eposta adresi")]
    public string Email { get; set; }
}