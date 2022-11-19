using Core.Entities.Abstract;
using Core.Utilities.DateHelper;

namespace Entities.Concrete;

public class Marble : IEntity
{
    public int Id { get; set; }
    public string Color { get; set; }
    public string ColorQuality { get; set; }
    public string Surface { get; set; }
    public string SurfaceQuality { get; set; }
    public string QualityClass { get; set; }
    public int OwnerId { get; set; }
    public string MarbleImage { get; set; }
    public string MarbleIcon { get; set; }
    public long CreatedAt = DateHelper.DateToTimestampt(DateTime.Now);
}