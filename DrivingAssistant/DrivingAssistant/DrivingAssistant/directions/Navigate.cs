using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Essentials;
using Xamarin.Forms;
using Xamarin.Forms.Maps;

namespace DrivingAssistant.directions
{
    //classe utilizzata per dare le indicazioni stradali al conducente
    class Navigate
    {
        private Task navigateTask = null;
        private Directions directions;

        public Navigate(Directions directions)
        {
            navigateTask = new Task(Run, TaskCreationOptions.LongRunning);
            this.directions = directions;
        }

        public void Start()
        {
            navigateTask.Start();
        }

        public void Stop()
        {
            navigateTask.Dispose();
        }

        private void Run()
        {
                //aggiorno la porzione di mappa visualizzata
                 TextToSpeech.SpeakAsync("Siamo pronti, partiamo, guida con prudenza!");
            


            //pronuncio i vari comandi alle distanze prefissate
            for (int i = 0; i < directions.steps.Count; i++)
            {
                Step step = directions.steps[i];
                GpsCoordinates coordinates = step.Coordinates;
                string instruction = step.Instruction;

                bool s1 = false;
                bool s2 = false;
                bool s3 = false;
                bool s4 = false;
                bool s5 = false;

                // Location now = await Geolocation.GetLastKnownLocationAsync();
                //double distance = Distance.BetweenPositions(new Position(now.Latitude, now.Longitude), new Position(coordinates.Latitude, coordinates.Longitude)).Meters / 1000.0;
                double distance = 50;
                //calcolo la distanza e pronuncio il comando
                while (true)
                {
                    //now = await Geolocation.GetLocationAsync();
                    distance--;//Distance.BetweenPositions(new Position(now.Latitude, now.Longitude), new Position(coordinates.Latitude, coordinates.Longitude)).Meters / 1000.0;

                        if (distance < 50 && distance > 10 && !s1)
                        {
                            //segnalazione 50 km
                            TextToSpeech.SpeakAsync("In 50 kilometers, " + instruction);
                            s1 = true;
                        }

                        if (distance < 10 && distance > 1 && !s2)
                        {
                            //segnalazione 10 km
                            TextToSpeech.SpeakAsync("In 10 kilometers, " + instruction);
                            s2 = true;
                        }

                        if (distance < 1 && distance > 0.5 && !s3)
                        {
                            //segnalazione 1 km
                            TextToSpeech.SpeakAsync("In 1 kilometer, " + instruction);
                            s3 = true;
                        }

                        if (distance < 0.5 && distance > 0.15 && !s4)
                        {
                            //segnalazione 500m
                            TextToSpeech.SpeakAsync("In 500 meters, " + instruction);
                            s4 = true;
                        }

                        if (distance < 0.15 && distance > 0.050 && !s5)
                        {
                            //segnalazione 150m
                            TextToSpeech.SpeakAsync("In 150 meters, " + instruction);
                            s5 = true;
                        }

                        if (distance < 0.050)
                        {
                            //segnalazione durante la svolta
                            TextToSpeech.SpeakAsync(instruction);
                            break;
                        }
                    
                    Console.WriteLine(distance.ToString());
                    Task.Delay(1000).Wait();
                }
            }
        }
    }
}


/*
 
 //inizio la navigazione vera e propria
                for(int i = 0; i < commands.steps.Count; i++)
                {
                    Step dir = commands.steps[i];
                    string command = dir.Instruction;
                    //pronuncio l'indicazione subito dopo la successiva, a 50km, a 10km, a 1km, a 500m, a150m, durante la svolta

                    //calcolo la distanza dalla prossima svolta
                    GpsCoordinates nextTurnCoordinates = dir.Coordinates;

                    bool s1 = false;
                    bool s2 = false;
                    bool s3 = false;
                    bool s4 = false;
                    bool s5 = false;

                    double distance = Distance.BetweenPositions(new Position(latitute, longitude), new Position(nextTurnCoordinates.Latitude, nextTurnCoordinates.Longitude)).Meters / 1000.0;
                    
                    Device.BeginInvokeOnMainThread(async () =>
                    {
                        //await TextToSpeech.SpeakAsync("In " + ((int)distance).ToString() + " kilometers " + dir.Instruction);
                        await DisplayAlert("Alert", "Ciao", "OK");
                    });

                   

                    
                    await Task.Delay(500);
                }*/