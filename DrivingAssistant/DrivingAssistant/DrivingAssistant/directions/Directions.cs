using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace DrivingAssistant.directions
{
    class Directions
    {
        //classe contenente le informazioni per navigare
        public List<GpsCoordinates> linePoints { get; set; }//punti da utilizzare per tracciare la linea
        public List<Step> steps { get; set; }//lista delle istruzioni da pronunciare

        public long Duration { get; set; }//durata del percorso in secondi

        public float Distance { get; set; }//distanza in km

        public Directions()
        {
            linePoints = new List<GpsCoordinates>();
            steps = new List<Step>();
        }

        public static Directions LoadFromJSONString(string jsonString)
        {
            Directions directions = new Directions();

            JObject jsonObj = JObject.Parse(jsonString);
            JArray features = (JArray)jsonObj.SelectToken("features");

            //carico le informazioni sulle manovre da effettuare, la distanza e il tempo impiegato
            JObject properties = (JObject)features[0].SelectToken("properties");
            JArray segments = (JArray)properties.SelectToken("segments");
            JArray steps = (JArray)segments[0].SelectToken("steps");

            directions.Duration = (long)(float)segments[0].SelectToken("duration");
            directions.Distance = (float)segments[0].SelectToken("distance");

            foreach (var step in steps)
            {
                double distance = step["distance"].Value<float>();
                string instruction = step["instruction"].Value<string>();
                float duration = step["duration"].Value<float>();
                directions.steps.Add(new Step((float)distance, instruction, duration));
            }

            //carico la lista dei punti da utilizzare per tracciare la linea del percorso
            JObject geometry = (JObject)features[0].SelectToken("geometry");
            JArray coordinates = (JArray)geometry.SelectToken("coordinates");

            foreach (JArray point in coordinates)
            {
                double longitude = (double)point[0];
                double latitude = (double)point[1];
                directions.linePoints.Add(new GpsCoordinates(latitude,longitude));
            }

            return directions;
        }
    }
}
