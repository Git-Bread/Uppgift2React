using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using TodoApi.Data;

namespace TodoApi
{
    //startup class, alot of new configuration and tried using OpenAPI swashbuckle aswell since i heard it was cool
    public class Startup
    {
        //constructor
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            //sqlite database connection
            services.AddDbContext<TodoContext>(options =>
                options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));

            services.AddControllers();
            
            //OpenAPI, swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { 
                    Title = "Todo API", 
                    Version = "v1",
                    Description = "Todo Api"
                });
            });

            //Add CORS policy if needed, allows for cross-origin requests and less un-fun bug squashing
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", 
                builder => builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());
            });
        }

        //http pipeline configuration
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, TodoContext context)
        {
            //checks so that its created, love me a descriptive function name
            context.Database.EnsureCreated();
            

            app.UseDeveloperExceptionPage();
            //does not work in .net 9, but works well here
            app.UseSwagger();
            app.UseSwaggerUI(c => 
            {
                c.SwaggerEndpoint("./swagger/v1/swagger.json", "Todo API v1");
                c.RoutePrefix = string.Empty;
            });

            app.UseRouting();
            app.UseCors("AllowAll");
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}