using Entities.Concrete;

namespace Business.Abstract;

public interface IMarbleService
{
    Task<List<Marble>> GetAll();
    Task<Marble> GetById(int id);
    Task Add(Marble marble);
    Task Update(Marble marble);
    Task Delete(Marble marble);
    string CalculateMarbleQuality(float quality);
    string GetMarbleIcon(float quality);
}