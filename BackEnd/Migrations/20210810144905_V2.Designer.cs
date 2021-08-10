﻿// <auto-generated />
using System;
using BackEnd.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace BackEnd.Migrations
{
    [DbContext(typeof(FirmaContext))]
    [Migration("20210810144905_V2")]
    partial class V2
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.8")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("BackEnd.Models.Firma", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Adresa")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("Adresa");

                    b.Property<int>("Maxbudget")
                        .HasColumnType("int")
                        .HasColumnName("Maxbudget");

                    b.Property<string>("Naziv")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("Naziv");

                    b.Property<string>("Tip")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("Tip");

                    b.HasKey("ID");

                    b.ToTable("Firme");
                });

            modelBuilder.Entity("BackEnd.Models.Radnik", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Ime")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("Ime");

                    b.Property<int>("Plata")
                        .HasColumnType("int")
                        .HasColumnName("Plata");

                    b.Property<string>("Prezime")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("Prezime");

                    b.Property<string>("Rank")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("Rank");

                    b.Property<int?>("SektorID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("SektorID");

                    b.ToTable("Radnici");
                });

            modelBuilder.Entity("BackEnd.Models.Sektor", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Budget")
                        .HasColumnType("int")
                        .HasColumnName("Budget");

                    b.Property<int?>("FirmaID")
                        .HasColumnType("int");

                    b.Property<string>("Ime")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("Ime");

                    b.Property<string>("Opis")
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)")
                        .HasColumnName("Opis");

                    b.HasKey("ID");

                    b.HasIndex("FirmaID");

                    b.ToTable("Sektori");
                });

            modelBuilder.Entity("BackEnd.Models.Radnik", b =>
                {
                    b.HasOne("BackEnd.Models.Sektor", "Sektor")
                        .WithMany("Radnici")
                        .HasForeignKey("SektorID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Sektor");
                });

            modelBuilder.Entity("BackEnd.Models.Sektor", b =>
                {
                    b.HasOne("BackEnd.Models.Firma", "Firma")
                        .WithMany("Sektori")
                        .HasForeignKey("FirmaID");

                    b.Navigation("Firma");
                });

            modelBuilder.Entity("BackEnd.Models.Firma", b =>
                {
                    b.Navigation("Sektori");
                });

            modelBuilder.Entity("BackEnd.Models.Sektor", b =>
                {
                    b.Navigation("Radnici");
                });
#pragma warning restore 612, 618
        }
    }
}
