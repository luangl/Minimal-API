using Microsoft.EntityFrameworkCore;

public static class ExamesAPI
{
    public static void MapExamesAPI(this WebApplication app)
    {
        var group = app.MapGroup("/exames");

        group.MapGet("/", async (BancoDeDados db) =>
            await db.Exames.ToListAsync()
        );

        group.MapPost("/", async (Exame exame, BancoDeDados db) =>
        {
            db.Exames.Add(exame);
            await db.SaveChangesAsync();

            return Results.Created($"/exames/{exame.Id}", exame);
        });

        group.MapPut("/{id}", async (int id, Exame exameAlterado, BancoDeDados db) =>
        {
            var exame = await db.Exames.FindAsync(id);
            if (exame is null)
            {
                return Results.NotFound();
            }
            exame.Tipo = exameAlterado.Tipo;
            exame.Resultado = exameAlterado.Resultado;
            exame.Data = exameAlterado.Data;

            await db.SaveChangesAsync();

            return Results.NoContent();
        });

        group.MapDelete("/{id}", async (int id, BancoDeDados db) =>
        {
            var exame = await db.Exames.FindAsync(id);
            if (exame is not null)
            {
                db.Exames.Remove(exame);
                await db.SaveChangesAsync();
                return Results.NoContent();
            }
            return Results.NotFound();
        });
    }
}
