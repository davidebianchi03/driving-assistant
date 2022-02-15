using System;
using System.Collections.Generic;
using System.Text;
using Xamarin.Forms.Maps;

namespace DrivingAssistant
{
    //mappa personalizzata per l'utilizzo di segnaposti personalizzati
    public class CustomMap : Map
    {
        public List<CustomPin> CustomPins { get; set; }
    }
}
