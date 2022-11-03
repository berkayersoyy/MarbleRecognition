using Core.Entities.Concrete;

namespace Business.Abstract;

public interface IUserService
{
    Task<List<User>> GetAll();
    Task<User> GetById(int id);
    Task Add(User user);
    Task Update(User user);
    Task Delete(User user);
    Task<User> GetByMail(string email);
}