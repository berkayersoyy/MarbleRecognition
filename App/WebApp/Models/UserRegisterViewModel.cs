using System.ComponentModel.DataAnnotations;

namespace WebApp.Models;

public class UserRegisterViewModel
{
    [Required(ErrorMessage = "Kullanıcı adı boş bırakılamaz")]
    [RegularExpression(@"^[a-zA-Z0-9_.-]*$",ErrorMessage = "Kullanıcı adı özel karakter içeremez")]
    [MinLength(2,ErrorMessage = "Kullanıcı adı 2 karakterden kısa olamaz")]
    [MaxLength(32,ErrorMessage = "Kullanıcı adı 32 karakterden uzun olamaz")]
    public string Nickname { get; set; }
    [Required(ErrorMessage = "Eposta adresi boş bırakılamaz")]
    [DataType(DataType.EmailAddress,ErrorMessage = "Geçersiz eposta adresi")]
    [RegularExpression(@"^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$", ErrorMessage = "Geçersiz eposta adresi")]
    public string Email { get; set; }
    [Required(ErrorMessage = "Şifre boş bırakılamaz")]
    [RegularExpression("^(?=.{8,})(?=.*[a-z])(?=.*[A-Z]).*$",ErrorMessage = "Şifre en az 8 karakter uzunluğunda olmalı, 1 adet büyük ve 1 adet küçük harf içermeli")]
    [DataType(DataType.Password)]
    public string Password { get; set; }
    [Required(ErrorMessage = "Şifre boş bırakılamaz")]
    [Compare("Password",ErrorMessage = "Girilen şifreler aynı olmalı")]
    public string PasswordConfirmation { get; set; }
    [Range(typeof(bool), "true", "true", ErrorMessage="Kullanıcı sözleşmesi kabul edilmeli")]
    public bool Terms { get; set; }
}