using Frontend.Boilerplate.Settings;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.IO;

namespace Frontend.Boilerplate
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                try
                {
                    app
                    .UseWebpackDevMiddleware(
                      new WebpackDevMiddlewareOptions
                      {
                          HotModuleReplacement = true,
                          ProjectPath = Path.Combine(Directory.GetCurrentDirectory(), "ClientApp"),
                          HotModuleReplacementEndpoint = Configuration["AppSettings:PUBLIC_URL"] + "build/__webpack_hmr",
                          ConfigFile = "webpack.prod.babel.js",
                          EnvParam = new Dictionary<string, string>()
                          {
                               {"mode","production" },
                          },
                          EnvironmentVariables = new Dictionary<string, string>()
                          {
                                {"PUBLIC_URL",Configuration["AppSettings:PUBLIC_URL"] },
                                {"APP_INSIGHTS_KEY",Configuration["AppSettings:APP_INSIGHTS_KEY"] },
                                {"MOCK_API",Configuration["AppSettings:MOCK_API"] },
                                {"PRERENDERING",Configuration["AppSettings:PRERENDERING"] },
                          }
                      });
                }
                catch (Exception exception)
                {
                    Console.WriteLine(exception);
                }
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseCookiePolicy();

            app.UseCors("All");

            //app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute("default", "{controller=Home}/{action=Index}/{id?}");
                routes.MapSpaFallbackRoute("spa", new { controller = "Home", action = "Index" });
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = Path.Combine(Directory.GetCurrentDirectory(), "ClientApp");
            });
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddApplicationInsightsTelemetry();

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            var authSettings = Configuration.GetSection("Auth").Get<AuthSettings>();

            services.AddCors(o => o.AddPolicy("All", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));
            services.AddNodeServices();
            services.AddSpaPrerenderer();
        }
    }
}