using System;
using System.Collections.Generic;
using System.Text;

namespace DrivingAssistant.directions
{
    //classe che contiene latitudine e longitudine di una coordinata satellitare
    class GpsCoordinates
    {
        public double Latitude { get; set; } = 0.0d;
        public double Longitude { get; set; } = 0.0d;

        public GpsCoordinates()
        {
            Latitude = 0;
            Longitude = 0;
        }

        public GpsCoordinates(double Latitude, double Longitude)
        {
            this.Latitude = Latitude;
            this.Longitude = Longitude;
        }
    }
}
