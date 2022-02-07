using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;
using Xamarin.Essentials;
using Xamarin.Forms.Maps;
using DrivingAssistant.directions;

namespace DrivingAssistant
{
    public partial class MainPage : ContentPage
    {
        private GpsCoordinates lastAvailablePosition = null;
        private Polyline polyline;//indicazioni stradali da seguire

        public MainPage()
        {
            InitializeComponent();
            navigateFrame.IsVisible = false;//nascondo di default il frame per l'inserimento del punto di partenza e della destinazione
            tripInformations.IsVisible = false;
            //inizializzo la posizione del frame di navigazione fuori dallo schermo
            Task.Factory.StartNew(async () =>
            {
                Device.BeginInvokeOnMainThread(async () =>
                {
                    await navigateFrame.TranslateTo(0, (-1) * navigateFrame.Height);
                    navigateFrame.IsVisible = false;
                });
            });

            //visualizzo il frame con il messaggio che indica che ci si sta connettendo ai satelliti GPS
            waitForGPSFrame.IsVisible = true;


            //aspetto fino a quando non ci si riesce a connettere ai satelliti GPS
            WaitForGPSConnection();

            //inizio ad aggiornare la posizione in tempo reale
            LivePosition();
        }

        private void BtnNavigateClick(object sender, EventArgs e)
        {
            Task.Factory.StartNew(async () =>
            {
                Device.BeginInvokeOnMainThread(async () =>
                {
                    navigateFrame.IsVisible = true;
                    await navigateFrame.TranslateTo(0, 0);
                });
            });
        }

        private bool navigationStartAnimation = false;
        private void BtnStartClick(object sender, EventArgs e)
        {
            //imposto il navigatore e parto
            Task.Factory.StartNew(async () =>
            {
                var location = Geolocation.GetLocationAsync();
                var latitute = location.Result.Latitude;
                var longitude = location.Result.Longitude;
                //test navigatore
                GpsCoordinates origin = lastAvailablePosition;

                //parser dell'indirizzo in coordinate gps
                var destinations = Geocoding.GetLocationsAsync(txtDestinationPoint.Text);
                var destination = destinations.Result.FirstOrDefault();

                GpsCoordinates destinationCoordinates = new GpsCoordinates(destination.Latitude, destination.Longitude);

                FindDirections directions = new FindDirections("5b3ce3597851110001cf6248c7034c7108e14cb5aa803407bc7023d4");
                string jsonString = directions.GetDirections(origin, destinationCoordinates);

                //carico la lista delle direzioni
                Directions commands = Directions.LoadFromJSONString(jsonString);


                Device.BeginInvokeOnMainThread(async () =>
                {
                    for (int i = 0; i < map.MapElements.Count; i++)
                    {
                        map.MapElements.RemoveAt(0);
                    }

                });

                //disegno il percorso sulla mappa
                polyline = new Polyline()
                {
                    StrokeColor = Color.FromRgb(30, 158, 250),
                    StrokeWidth = 50
                };

                foreach (GpsCoordinates point in commands.linePoints)
                {
                    polyline.Geopath.Add(new Position(point.Latitude, point.Longitude));
                }

                Device.BeginInvokeOnMainThread(async () =>
                {
                    map.MapElements.Add(polyline);
                    //nascondo il riquadro di selezione della destinazione
                    await navigateFrame.TranslateTo(0, (-1) * navigateFrame.Height);
                    navigateFrame.IsVisible = false;

                    //aggiorno e visualizzo le indicazioni sulle tempistiche
                    distance.Text = ((int)(commands.Distance / 1000)).ToString() + " km";
                    DateTime now = DateTime.Now;
                    now = now.AddSeconds(commands.Duration);
                    var minutes = now.Minute.ToString();

                    if(minutes.Length < 2)
                    {
                        minutes = "0" + minutes;
                    }

                    arrivalTime.Text = now.Hour.ToString() + ":" + minutes;
                    tripInformations.IsVisible = true;
                    txtDestinationPoint.Text = "";
                });

                //dico di fare l'animazione zoom out - zoom in
                navigationStartAnimation = true;


                Device.BeginInvokeOnMainThread(async () =>
                {
                    //aggiorno la porzione di mappa visualizzata
                    map.MoveToRegion(MapSpan.FromCenterAndRadius(new
                    Xamarin.Forms.Maps.Position(latitute, longitude),
                    Distance.FromMiles(50)));
                });

                

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

                    while (true)
                    {
                        distance = Distance.BetweenPositions(new Position(latitute, longitude), new Position(nextTurnCoordinates.Latitude, nextTurnCoordinates.Longitude)).Meters / 1000.0;

                        if (distance < 50 && distance > 10 && !s1)
                        {
                            //segnalazione 50 km
                            await TextToSpeech.SpeakAsync("In 50 kilometers " + dir.Instruction);
                            s1 = true;
                        }

                        if (distance < 50 && distance > 1 && !s2)
                        {
                            //segnalazione 10 km
                            await TextToSpeech.SpeakAsync("In 10 kilometers " + dir.Instruction);
                            s2 = true;
                        }

                        if (distance < 1 && distance > 0.5 && !s3)
                        {
                            //segnalazione 1 km
                            await TextToSpeech.SpeakAsync("In 1 kilometer " + dir.Instruction);
                            s3 = true;
                        }

                        if (distance < 0.5 && distance > 0.15 && !s4)
                        {
                            //segnalazione 500m
                            await TextToSpeech.SpeakAsync("In 500 meters " + dir.Instruction);
                            s4 = true;
                        }

                        if (distance < 0.15 && distance > 0.050 && !s5)
                        {
                            //segnalazione 150m
                            await TextToSpeech.SpeakAsync("In 150 meters " + dir.Instruction);
                            s5 = true;
                        }

                        if (distance < 0.050)
                        {
                            //segnalazione durante la svolta
                            await TextToSpeech.SpeakAsync(dir.Instruction);
                            break;
                        }

                        Console.WriteLine(distance.ToString());
                        await Task.Delay(100);
                    }

                    
                    await Task.Delay(500);
                }
            }, TaskCreationOptions.RunContinuationsAsynchronously);
        }


        private void BtnCancelClick(object sender, EventArgs e)
        {
            Task.Factory.StartNew(async () =>
            {
                Device.BeginInvokeOnMainThread(async () =>
                {
                    await navigateFrame.TranslateTo(0, (-1) * navigateFrame.Height);
                    navigateFrame.IsVisible = false;
                    txtDestinationPoint.Text = "";
                });
            });
        }

        //metodo per visualizzare in tempo reale la posizione dell'utente sulla mappa
        private void LivePosition()
        {
            Task.Factory.StartNew(async () =>
            {
                while (true)
                {
                    var pin = new Pin();

                    var location = Geolocation.GetLocationAsync();

                    if (navigationStartAnimation)
                    {

                        navigationStartAnimation = false;
                    }


                    if (location != null)
                    {
                        var latitute = location.Result.Latitude;
                        var longitude = location.Result.Longitude;
                        var speed = location.Result.Speed.HasValue ? location.Result.Speed.Value : 0;
                        //calcolo il raggio della mappa visualizzata in base alla velocità
                        double speedInKmH = speed;
                        double mapRadius = 0.02;
                        mapRadius = (0.5 * (speed * 3.6)) / 33;
                        if (mapRadius < 0.02)
                            mapRadius = 0.02;

                        //aggiorno il pin
                        pin.Position = new Position(latitute, longitude);
                        pin.Label = " ";

                        if (navigationStartAnimation)
                        {
                            navigationStartAnimation = false;
                            await Task.Delay(2500);
                        }

                        //aggiorno il pin sulla mappa
                        Device.BeginInvokeOnMainThread(async () =>
                        {
                            if (map.Pins.Count == 0)
                                map.Pins.Add(pin);
                            else
                                map.Pins[0] = pin;

                            //aggiorno la porzione di mappa visualizzata
                            map.MoveToRegion(MapSpan.FromCenterAndRadius(new
                            Xamarin.Forms.Maps.Position(latitute, longitude),
                            Distance.FromMiles(0.02)));

                            //aggiorno la velocità visualizzata
                            if (speed.ToString() != "")
                                this.speed.Text = ((int?)speed * 3.6).ToString();
                            else
                                this.speed.Text = "0";
                        });

                        lastAvailablePosition = new GpsCoordinates(location.Result.Latitude, location.Result.Longitude);
                    }
                    await Task.Delay(500);//aggiorno la posizione ogni 500 millisecondi
                }
            }, TaskCreationOptions.LongRunning);
        }

        private void WaitForGPSConnection()
        {
            Task.Factory.StartNew(async () =>
            {
                bool runTask = true;
                while (runTask)
                {
                    var pin = new Pin();

                    var location = Geolocation.GetLocationAsync();
                    if (location != null)
                    {
                        runTask = false;
                        waitForGPSFrame.IsVisible = false;
                        lastAvailablePosition = new GpsCoordinates(location.Result.Latitude, location.Result.Longitude);
                    }
                    await Task.Delay(500);//aggiorno la posizione ogni 500 millisecondi
                }
            }, TaskCreationOptions.LongRunning);
        }
    }
}
