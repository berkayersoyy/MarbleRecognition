using Core.Entities.Abstract;
using Core.Utilities.DateHelper;
using Microsoft.AspNetCore.Identity;

namespace Core.Entities.Concrete;

public class User:IdentityUser<int>,IEntity
{
    public string Nickname { get; set; }
    public string? Avatar { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public int? SexId { get; set; }
    public int? MarialStatusId { get; set; }
    public int? EducationId { get; set; }
    public int? EmploymentId { get; set; }
    public int? CityId { get; set; }
    public int? NationalityId { get; set; }
    public int? IncomeStatusId { get; set; }
    public long CreatedAt { get; set; } = DateHelper.DateToTimestampt(DateTime.Now);
    public string? Url { get; set; }
    public bool Status { get; set; } = true;
}