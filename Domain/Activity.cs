namespace Domain;

public class Activity
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Title { get; set; } // required or default value to avoid nullability warnings
    public DateTime Date { get; set; }
    public required string Desc { get; set; }
    public required string Category { get; set; }
    public bool IsCancelled { get; set; }
    
    // location props
    public required string City { get; set; }
    public required string Venue { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}