using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<CountryDto>> GetAll()
        {
            return Database.Countries;
        }

        [HttpGet("{id}")]
        public ActionResult<CountryDto> Get(int id)
        {
            return Database.Countries.FirstOrDefault(r => r.Id == id);
        }

        [HttpPost]
        public void Post(CountryDto country)
        {
            Database.Countries.Add(country);
        }

        [HttpPut]
        public void Put(CountryDto country)
        {
            Database.Countries.FirstOrDefault(r => r.Id == country.Id).Name = country.Name;
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            Database.Countries.RemoveAt(id - 1);
        }
    }
}

public static class Database
{
    public static List<CountryDto> Countries =
        new List<CountryDto>() {
            new CountryDto { Id = 1, Name = "Egypt" },
            new CountryDto { Id = 2, Name = "Bahrain" },
        };
}

public class CountryDto
{
    public int Id { get; set; }
    public string Name { get; set; }
}
