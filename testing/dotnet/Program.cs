using System.Text.Json.Nodes;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// set port to 8998 
builder.WebHost.ConfigureKestrel(options => {
    options.ListenLocalhost(8998);
});

var app = builder.Build();

app.MapPost("/api/purchase", async ([FromBody] JsonObject body) => {
    return Results.Ok(body);
});

app.Run();
