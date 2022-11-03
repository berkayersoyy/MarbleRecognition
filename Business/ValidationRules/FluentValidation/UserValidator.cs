using Core.Entities.Concrete;
using FluentValidation;

namespace Business.ValidationRules.FluentValidation;

public class UserValidator:AbstractValidator<User>
{
    public UserValidator()
    {
        //min 2 karakter max 32 karakter harf ve sayı
        RuleFor(p => p.Nickname).NotNull().WithErrorCode("Nickname cannot be null!");
        RuleFor(p => p.Nickname).NotEmpty().WithErrorCode("Nickname cannot be empty!");
        RuleFor(p => p.Nickname).Must(p=>p.Length>=2 && p.Length<=32).WithErrorCode("Nickname cannot be shorter than 2 and longer than 32 character!");
        RuleFor(p => p.Nickname).Matches(@"^[a-zA-Z0-9_.-]*$").WithErrorCode("Nickname cannot have special character!");
        //Email
        RuleFor(p => p.Email).NotNull().WithErrorCode("Email cannot be null!");
        RuleFor(p => p.Email).NotEmpty().WithErrorCode("Email cannot be empty!");
        RuleFor(p => p.Email).EmailAddress().WithErrorCode("Wrong email format!");
        
        //min 8 karakter min 1 büyük harf min 1 küçük harf içermeli. Özel karakter içerebilir.
    }
}