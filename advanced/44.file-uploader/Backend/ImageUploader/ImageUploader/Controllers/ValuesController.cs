using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace ImageUploader.Controllers
{
  [Route("api/[controller]/[action]")]
  [ApiController]
  public class ValuesController : ControllerBase
  {
    private readonly IHostingEnvironment _hostingEnvironment;
    public ValuesController(IHostingEnvironment hostingEnvironment)
    {
      _hostingEnvironment = hostingEnvironment;
    }

    [HttpPost]
    public ActionResult<ResultDto> Save(Model model)
    {
      var saveToDb = SaveBase64(model.FileName, $"user-{Guid.NewGuid()}", "Files");
      return new ResultDto { Result = saveToDb };
    }

    private string SaveBase64(string imgBase64, string ImgName, string folderName)
    {
      var path = $"{_hostingEnvironment.ContentRootPath}/{folderName}";

      //Create directory if it doesn't exist
      if (!Directory.Exists(path))
      {
        Directory.CreateDirectory(path);
      }
      var imageParts = imgBase64.Split(',').ToList<string>();
      //data: image / png; base64
      var imgExtension = $".{imageParts[0].Split('/')[1].Split(';')[0]}";
      string imageName = $"{ImgName}{imgExtension}";
      //set the image path
      string imgPath = Path.Combine(path, imageName);
      byte[] imageBytes = Convert.FromBase64String(imageParts[1]);
      System.IO.File.WriteAllBytes(imgPath, imageBytes);
      return imageName;
    }
  }

  public class Model
  {
    public string FileName { get; set; }
  }

  public class ResultDto
  {
    public string Result { get; set; }
  }
}
