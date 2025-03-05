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
    //startup class, alot of new configuration and tried using OpenAPI aswell since i heard it was cool
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
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));

            services.AddControllers();
            
            //OpenAPI
            services.AddEndpointsApiExplorer();
            services.AddOpenApi();

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
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, AppDbContext context)
        {
            //checks so that its created, love me a descriptive function name
            context.Database.EnsureCreated();
            
            //development environment check
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseOpenApi();
                app.UseSwaggerUi();
            }

            app.UseHttpsRedirection();
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