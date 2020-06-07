using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace authentication.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        [HttpPost]
        public ActionResult<LoginDto> Login()
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("verySecreteComplexKey"));
            var signInCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var tokenOptions = new JwtSecurityToken(
                expires: DateTime.Now.AddHours(24),
                signingCredentials: signInCredentials
                );

            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return new LoginDto { Token = token };
        }

        [HttpGet]
        public ActionResult<string> GetCountry()
        {
            return "test country from backend";
        }
    }
}

public class LoginDto
{
    public string Token { get; set; }
}
