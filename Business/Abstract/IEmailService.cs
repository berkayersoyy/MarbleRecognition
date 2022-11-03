using Core.Utilities.EmailHelper;

namespace Business.Abstract;

public interface IEmailService
{
    void SendEmail(EmailMessage emailMessage);
}