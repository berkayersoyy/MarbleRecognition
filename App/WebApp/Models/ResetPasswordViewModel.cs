using System.ComponentModel.DataAnnotations;

namespace WebApp.Models;

public class ResetPasswordViewModel
{
    [Required(ErrorMessage = "Şifre boş bırakılamaz")]
    [RegularExpression("^(?=.{8,})(?=.*[a-z])(?=.*[A-Z]).*$",ErrorMessage = "Şifre en az 8 karakter uzunluğunda olmalı, 1 adet büyük ve 1 adet küçük harf içermeli")]
    [DataType(DataType.Password)]
    public string Password { get; set; }

    [Required(ErrorMessage = "Şifre boş bırakılamaz")]
    [Compare("Password",ErrorMessage = "Girilen şifreler aynı olmalı")]
    public string PasswordConfirmation { get; set; }

    public string Email { get; set; }
    public string Token { get; set; }
}