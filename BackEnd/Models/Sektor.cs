using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BackEnd.Models{
    [Table("Sektori")]
    public class Sektor{

        [Key]
        [Column("ID")]
        public int ID { get; set; }
        [Column("Ime")]
        [MaxLength(255)]
        public string Ime { get; set; }

        [Column("Budget")]
        public int Budget { get; set; }

        [Column("Opis")]
        [MaxLength(500)]
        public string Opis { get; set; }

        [JsonIgnore]
        public Firma Firma{get;set;}
        public virtual List<Radnik> Radnici{get;set;}
        

    }
}