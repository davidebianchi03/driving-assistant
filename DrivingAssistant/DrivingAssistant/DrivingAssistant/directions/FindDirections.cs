using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text;

namespace DrivingAssistant.directions
{
    //classe per ottenere le indicazioni da seguire per raggiungere la destinazione specificata (uso le api per la direzione di openrouteservice [sono gratis])
    class FindDirections
    {
        /*
            - Mi connetto tramite client http al server di google
            - Faccio una richiesta per sapere le indicazione da un punto A ad un punto B
            - Restituisco una lista di indicazioni da visualizzare sulla mappa
        */

        private string ApiKey;

        public FindDirections(string ApiKey)
        {
            this.ApiKey = ApiKey;
        }

        //metodo per calcolare la direzione
        public string GetDirections(GpsCoordinates origin, GpsCoordinates destination)
        {
            try
            {
                string requestUrl = $"http://api.openrouteservice.org/v2/directions/driving-car?api_key={ApiKey}&start={origin.Longitude.ToString().Replace(",", ".")},{origin.Latitude.ToString().Replace(",", ".")}&end={destination.Longitude.ToString().Replace(",", ".")},{destination.Latitude.ToString().Replace(",", ".")}";
                var request = WebRequest.Create(requestUrl);
                request.Method = "GET";
                var webResponse = request.GetResponse();
                var webStream = webResponse.GetResponseStream();
                var streamReader = new StreamReader(webStream);
                string responseString = streamReader.ReadToEnd();
                return responseString;
            }
            catch (Exception ex)
            {
                return string.Empty;
            }
        }

    }
}
