using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;

namespace dotnetTutorial.Controllers;

public class MovieController : Controller
{
    // 
    // GET: /HelloWorld/
    public string Index()
    {
        return "This is my default action moview Controller is trigger...";
    }
    
    // GET: /HelloWorld/Welcome/ 
    // Requires using System.Text.Encodings.Web;
    public string Welcome(string name, int numTimes = 1)
    {
        return HtmlEncoder.Default.Encode($"Hello {name}, NumTimes is: {numTimes}");
    }
}