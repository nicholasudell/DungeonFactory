using DungeonFactory.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DungeonFactory.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MapController : ControllerBase
    {
        private readonly MapService mapService;

        public MapController(MapService mapService)
        {
            this.mapService = mapService;
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public IActionResult GetMapData(Guid id)
        {
            using var image = mapService.GetMapContents(id);

            return File(image, "image/jpeg");
        }
    }
}
