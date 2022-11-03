using System.Linq.Expressions;
using Core.Entities.Abstract;

namespace Core.DataAccess;

public interface IEntityRepository<T> where T:class,IEntity,new()
{
    Task<T> Get(Expression<Func<T, bool>> filter);
    Task<IList<T>> GetList(Expression<Func<T, bool>> filter=null);
    Task Add(T entity);
    Task Update(T entity);
    Task Delete(T entity);
}