

using Microsoft.EntityFrameworkCore;

public class BancoDeDados : DbContext
{
    //Configuração da conexão
    protected override void OnConfiguring(DbContextOptionsBuilder builder)
    {
        builder.UseMySQL("server=localhost;port=3306;database=clinica;user=root;password=luanmy13");
    }

    //Mapeamento das tabelas
    public DbSet<Medico> Medicos { get; set; }
    public DbSet<Paciente> Pacientes { get; set; }
    public DbSet<Consulta> Consultas { get; set; }
    public DbSet<Exame> Exames { get; set; }
    //Comandos dotnet
    //dotnet ef migrations add CriarTabelaProduto
    //dotnet ef database update

}