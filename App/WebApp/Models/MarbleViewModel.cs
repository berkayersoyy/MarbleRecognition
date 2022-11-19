using Core.Entities.Abstract;

namespace WebApp.Models;

public class MarbleViewModel:IEntity
{
    public int Id { get; set; }
    public string Color { get; set; }
    public float Quality { get; set; }
    public int OwnerId { get; set; }
}