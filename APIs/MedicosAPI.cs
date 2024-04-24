
using Microsoft.EntityFrameworkCore;

public static class MedicosApi {

    public static void MapMedicosApi(this WebApplication app)
    {

        var group = app.MapGroup("/medicos");


        group.MapGet("/", async (BancoDeDados db) =>
            //select * from medicos
            await db.Medicos.ToListAsync()
        );

        group.MapPost("/", async (Medico medico, BancoDeDados db) =>
        {
            db.Medicos.Add(medico);
            //insert into...
            await db.SaveChangesAsync();

            return Results.Created($"/medicos/{medico.Id}", medico);
        }
        );

        group.MapPut("/{id}", async (int id, Medico medicoAlterada, BancoDeDados db) =>
        {
            //select * from medicos where id = ?
            var medico = await db.Medicos.FindAsync(id);
            if (medico is null)
            {
                return Results.NotFound();
            }
            medico.Nome = medicoAlterada.Nome;
            medico.Telefone = medicoAlterada.Telefone;
            medico.Email = medicoAlterada.Email;
            medico.CPF = medicoAlterada.CPF;

            //update....
            await db.SaveChangesAsync();

            return Results.NoContent();
        }
        );

        group.MapDelete("/{id}", async (int id, BancoDeDados db) =>
        {
            if (await db.Medicos.FindAsync(id) is Medico medico)
            {
                //Operações de exclusão
                db.Medicos.Remove(medico);
                await db.SaveChangesAsync();
                return Results.NoContent();
            }
            return Results.NotFound();
        }
        );
    }
}