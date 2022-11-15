using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace generic_http_service.Controllers
{
    [Route("api/[controller]/[action]")]
    public class ValuesController : Controller
    {
        private static List<String> _countries = new List<string>() { "Initial country" };

        // GET api/values
        [HttpGet]
        public IEnumerable<string> GetList()
        {
            return _countries;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string GetCountry(int id)
        {
            return _countries.ElementAt(id);

        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
            _countries.Add(value);

        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
            _countries[id] = value;
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _countries.RemoveAt(id);
        }
    }
}
