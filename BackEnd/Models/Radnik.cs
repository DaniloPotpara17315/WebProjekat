using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BackEnd.Models{
    [Table("Radnici")]
    public class Radnik{
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Ime")]
        [MaxLength(255)]
        public string Ime { get; set; }

        [Column("Prezime")]
        [MaxLength(255)]
        public string Prezime { get; set; }

        [Column("Rank")]
        [MaxLength(255)]
        public string Rank { get; set; }
        [Column("Plata")]
        public int Plata { get; set; }
        [JsonIgnore]
        public Sektor Sektor{get;set;}
    }
}