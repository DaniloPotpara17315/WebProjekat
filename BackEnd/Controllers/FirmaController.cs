using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackEnd.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Diagnostics;

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

        [Route("VratiFirme")]
        [HttpGet]
        public async Task<List<Firma>> VratiFirme(){
            return await Context.Firme.Include(s => s.Sektori).ThenInclude(x=>x.Radnici).ToListAsync();
        }

        [Route("UnesiFirmu")]
        [HttpPost]
        public async Task UnesiFirmu([FromBody] Firma firma)
        {
            Context.Firme.Add(firma);
            await Context.SaveChangesAsync();

        }

        [Route("UnesiSektor/{idFirme}")]
        [HttpPost]
        public async Task<IActionResult> UnesiSektor(int idFirme,[FromBody]Sektor sektor){

            var firma = await Context.Firme.FindAsync(idFirme);
            sektor.Firma = firma;
            Context.Sektori.Add(sektor);
            await Context.SaveChangesAsync();
            int id = sektor.ID;
            return Ok(new {value =id});
        }


        [Route("IzmeniSektor")]
        [HttpPut]
        public async Task IzmeniSektor([FromBody]Sektor sektor){
            
            Context.Update<Sektor>(sektor);
            await Context.SaveChangesAsync();
        }

        [Route("ObrisiSektor/{id}")]
        [HttpDelete]
        public async Task ObrisiSektor(int id){
            var sekt = await Context.Sektori.FindAsync(id);
            Context.Remove(sekt);
            await Context.SaveChangesAsync();
        }

        [Route("UnesiRadnika/{idSektora}")]
        [HttpPost]
        public async Task<int> UnesiRadnika(int idSektora,[FromBody]Radnik radnik){

            var sekt = await Context.Sektori.FindAsync(idSektora);
            radnik.Sektor = sekt;
            Context.Radnici.Add(radnik);
            await Context.SaveChangesAsync();
            int id = radnik.ID;
            return id;
        }

        [Route("IzmeniRadnika")]
        [HttpPut]
        public async Task IzmeniRadnika([FromBody]Radnik radnik){
            
            Context.Update<Radnik>(radnik);
            await Context.SaveChangesAsync();
        }

        [Route("ObrisiRadnika/{id}")]
        [HttpDelete]
        public async Task ObrisiRadnika(int id){
            var rad = await Context.Radnici.FindAsync(id);
            Context.Remove(rad);
            await Context.SaveChangesAsync();
        }
        [Route("VratiRadnika/{id}")]
        [HttpGet]
        public async Task<Radnik> VratiRadnika(int id){
            return await Context.Radnici.FindAsync(id);
        }
    }
}
