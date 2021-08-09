using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackEnd.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace BackEnd.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FirmaController : ControllerBase
    {
        
        public FirmaContext Context { get; set; }
        public FirmaController(FirmaContext context)
        {
            Context = context;
        }  
    }
}
