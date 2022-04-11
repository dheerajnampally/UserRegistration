using UserRegistration.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Net;
using System.Net.Mail;

namespace UserRegistration.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpPost]
        public ActionResult RegisterPlayer(string FirstName, string LastName, string EmailId, int PhoneNumber,
                                            bool MenSingles, bool WomensSingles, bool MensDoubles, bool WomensDoubles, bool MixedDoubles,
                                            string MensDoublesPartnerName, string WomensDoublesPartnerName, string MixedDoublesPartnerName, string Amount)
        {

            //SendEmailHost(FirstName, LastName, EmailId, PhoneNumber,
            //  MenSingles, WomensSingles, MensDoubles, WomensDoubles, MixedDoubles,
            //  MensDoublesPartnerName, WomensDoublesPartnerName, MensDoublesPartnerName, Amount);

            //SendEmailParticipant(FirstName, LastName, EmailId, PhoneNumber,
            //  MenSingles, WomensSingles, MensDoubles, WomensDoubles, MixedDoubles,
            //  MensDoublesPartnerName, WomensDoublesPartnerName, MensDoublesPartnerName);

            //return Json(new { foo = "bar", baz = "Blech" });
            
            return Json(Url.Action("Privacy", "Home"));
        }


        private void SendEmailHost(string FirstName, string LastName, string EmailId, int PhoneNumber,
                                            bool MenSingles, bool WomensSingles, bool MensDoubles, bool WomensDoubles, bool MixedDoubles,
                                            string MensDoublesPartnerName, string WomensDoublesPartnerName, string MixedDoublesPartnerName, string Amount)
        {


            string isMensSingles = "No";
            string isWomensSingles ="No"; 
            string isMensDoubles ="No"; 
            string isWomensDoubles ="No"; 
            string isMixedDoubles ="No";

            if (MenSingles == true)
                isMensSingles = "Yes";

            if (WomensSingles == true)
                isWomensSingles = "Yes";

            if (MensDoubles == true)
                isMensDoubles = "Yes";

            if (WomensDoubles == true)
                isWomensDoubles = "Yes";

            if (MixedDoubles == true)
                isMixedDoubles = "Yes";

            var message = new MailMessage();
            message.To.Add(new MailAddress("nampally@hotmail.fr"));
            message.From = new MailAddress("carbadclub@gmail.com");
            message.Subject = "New Registration";

            message.Body = @$"New registration details 
                                FirstName : {FirstName} <BR>
                                LastName : {LastName} <BR>
                                Email : {EmailId}<BR>
                                Phone Number : {PhoneNumber} <BR>

                                Mens Singles : {isMensSingles} <BR>
                                Womens Singles : {isWomensSingles} <BR>

                                Mens Doubles : {isMensDoubles} <BR>
                                Partner Name : {MensDoublesPartnerName} <BR>

                                Womens Doubles : {isWomensDoubles} <BR>
                                Partner Name : {WomensDoublesPartnerName} <BR>

                                Mixed Doubles : {isMixedDoubles} <BR>
                                Partner Name : {MixedDoublesPartnerName}<BR>
                                Amount : {Amount}";
                                

            message.IsBodyHtml = true;

            var client = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new NetworkCredential("carbadclub@gmail.com", "C@rol!na"),
                EnableSsl = true
            };
            client.Send(message);
  
        }

        private void SendEmailParticipant(string FirstName, string LastName, string EmailId, int PhoneNumber,
                                            bool MenSingles, bool WomensSingles, bool MensDoubles, bool WomensDoubles, bool MixedDoubles,
                                            string MensDoublesPartnerName, string WomensDoublesPartnerName, string MixedDoublesPartnerName)
        {
            var message = new MailMessage();
            message.To.Add(new MailAddress(EmailId));
            message.From = new MailAddress("carbadclub@gmail.com");
            message.Subject = "Badminton Registration";

            
            message.Body = @$"Thank you for registring for the tournament";


            message.IsBodyHtml = true;
            var client = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new NetworkCredential("carbadclub@gmail.com", "C@rol!na"),
                EnableSsl = true
            };
            client.Send(message);

        }

    }
}