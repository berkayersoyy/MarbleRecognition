using System.Globalization;

namespace Core.Utilities.DateHelper;

public class DateHelper
{
    public static long DateToTimestampt(DateTime date)
    {
        return new DateTimeOffset(DateTime.UtcNow).ToUnixTimeMilliseconds();
    }

    public static DateTime TimestamptToDate(long timestampt)
    {
        DateTime dateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
        dateTime = dateTime.AddMilliseconds(timestampt).ToLocalTime();
        return dateTime;
    }

    public static string ToDDMMMMYYYYhhddmmStringFormat(DateTime dateTime)
    {
        return dateTime.ToString("dd MMMM yyyy hh:mm:ss",new CultureInfo("tr-TR"));
    }
}