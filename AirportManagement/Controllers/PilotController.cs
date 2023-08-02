using AirportManagement.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;

namespace AirportManagement.Controllers
{
    public class PilotController : Controller
    {
        // GET: Pilot
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Index(AddPilot a)
        {
            if (ModelState.IsValid)
            {
                string st = "";
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri("https://localhost:44338/api/");
                    var responseTask = client.PostAsJsonAsync<AddPilot>("Pilot", a);
                    responseTask.Wait();
                    var result = responseTask.Result;
                    var readData = result.Content.ReadAsAsync<string>();
                    if (result.IsSuccessStatusCode)
                    {
                        st = readData.Result;
                        ViewBag.msg = st;
                        ModelState.Clear();
                        return View(new AddPilot());
                    }
                    else
                    {
                        st = readData.Result;
                        ViewBag.msg = st;
                        return View();
                    }
                }
                
            }
            else
            {
                ViewBag.msg = "couldn't add pilot";
                return View(a);
            }
        }
    }
}