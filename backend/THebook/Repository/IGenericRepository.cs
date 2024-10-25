// File: backend/THebook/Repository/IGenericRepository.cs
using System.Linq.Expressions;

namespace THebook.Repository
{
    public interface IGenericRepository<T> where T : class
    {
        Task<List<T>> GetAllAsync();
        Task<T> GetByIdAsync(string id);
        Task InsertAsync(T entity);
        Task ReplaceAsync(string id, T entity);
    }
}
