using Microsoft.EntityFrameworkCore;
public static class ConsultasAPI
{
    public static void MapConsultasAPI(this WebApplication app)
    {
        var group = app.MapGroup("/consultas");


        group.MapGet("/", async (BancoDeDados db) =>
            //select * from consultas
            await db.Consultas.ToListAsync()
        );

        group.MapPost("/", async (Consulta consulta, BancoDeDados db) =>
        {
            db.Consultas.Add(consulta);
            //insert into...
            await db.SaveChangesAsync();

            return Results.Created($"/consultas/{consulta.Id}", consulta);
        }
        );

        group.MapPut("/{id}", async (int id, Consulta consultaAlterada, BancoDeDados db) =>
        {
            //select * from consultas where id = ?
            var consulta = await db.Consultas.FindAsync(id);
            if (consulta is null)
            {
                return Results.NotFound();
            }
            consulta.Descricao = consultaAlterada.Nome;
            consulta.Data = consultaAlterada.Telefone;
            consulta.Horario = consultaAlterada.Email;

            //update....
            await db.SaveChangesAsync();

            return Results.NoContent();
        }
        );

        group.MapDelete("/{id}", async (int id, BancoDeDados db) =>
        {
            if (await db.Consultas.FindAsync(id) is Consulta consulta)
            {
                //Operações de exclusão
                db.Consultas.Remove(consulta);
                await db.SaveChangesAsync();
                return Results.NoContent();
            }
            return Results.NotFound();
        }
        );
    }
}
