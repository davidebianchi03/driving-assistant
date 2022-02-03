using Xamarin.Forms.Maps;

namespace DrivingAssistant
{
    //pin personalizzato per poter inserire pin con le icone sulle mappe
    public class CustomPin : Pin
    {
        public string Name { get; set; }
        public string Url { get; set; }
    }
}