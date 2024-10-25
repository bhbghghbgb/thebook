using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using THebook.Models.Entities;

namespace THebook.Repository
{
    public interface ITagRepository : IGenericRepository<TagEntity>
    {
        Task<TagEntity?> FindByNameAsync(string name);
        Task DeleteAsync(string id);
    }
}
