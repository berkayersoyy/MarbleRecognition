namespace Core.CrossCuttingConcerns.Logging
{
    public class LogDetail
    {
        public string MethodName { get; set; }
        public List<LogParameter> LogParameters { get; set; }
        public string Date = DateTime.Now.ToString("dd.MM.yyyy hh:mm:ss");
        public string UserId { get; set; } = "Anonymus";
        public string ServiceName { get; set; }

    }


}
