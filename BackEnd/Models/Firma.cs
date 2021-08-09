using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.Models{

    [Table("Firme")]
    public class Firma{
        [Key]
        [Column("ID")]
        public int ID { get; set; }
        [Column("Naziv")]
        [MaxLength(255)]
        public string Naziv { get; set; }
        [Column("Tip")]
        [MaxLength(255)]
        public string Tip { get; set; }
        [Column("Adresa")]
        [MaxLength(255)]
        public string Adresa { get; set; }  
        [Column("Maxbudget")]
        public int Maxbudget { get; set; }

        public virtual List<Sektor> Sektori { get; set; }
    }
}