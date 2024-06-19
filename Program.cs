using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Configuração Swagger no builder
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuração banco MySQL
builder.Services.AddDbContext<BancoDeDados>();

// Configuração de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

var app = builder.Build();

// Configuração Swagger no app
app.UseSwagger();
app.UseSwaggerUI();

// Usar o middleware de CORS
app.UseCors("AllowAllOrigins");

app.MapGet("/", () => "Clinica API");

// APIs
app.MapMedicosApi();
app.MapPacientesApi();
app.MapConsultasApi();
app.MapExamesApi();

app.Run();
