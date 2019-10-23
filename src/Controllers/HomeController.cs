using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.Prerendering;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Frontend.Boilerplate.Controllers
{
    public class HomeController : Controller
    {
        public async Task<IActionResult> Index([FromServices] ISpaPrerenderer prerenderer)
        {
            try
            {
                var prerenderResult = await prerenderer.RenderToString("./ClientApp/build/server/main", exportName: "renderer");

                if (prerenderResult.StatusCode != null && prerenderResult.StatusCode != 200)
                {
                    return RedirectToPage("/Error");
                }

                var result = new
                {
                    html = prerenderResult.Html,
                    data = prerenderResult.Globals["data"],
                    scripts = prerenderResult.Globals["scripts"].ToList(),
                    links = prerenderResult.Globals["links"].ToList(),
                };

                return Ok(result);
            }
            catch (Exception ex)
            {
                return View("Error", ex);
            }
        }
    }
}