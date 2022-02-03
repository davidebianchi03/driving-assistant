using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;
using Xamarin.Essentials;
using Xamarin.Forms.Maps;

namespace DrivingAssistant
{
    public partial class MainPage : ContentPage
    {

        public MainPage()
        {
            InitializeComponent();
            navigateFrame.IsVisible = false;//nascondo di default il frame per l'inserimento del punto di partenza e della destinazione

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

        private void BtnCancelClick(object sender, EventArgs e)
        {
            Task.Factory.StartNew(async () =>
            {
                Device.BeginInvokeOnMainThread(async () =>
                {
                    await navigateFrame.TranslateTo(0, (-1) * navigateFrame.Height);
                    navigateFrame.IsVisible = false;
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
                    if (location != null)
                    {
                        var latitute = location.Result.Latitude;
                        var longitude = location.Result.Longitude;

                        //aggiorno il pin
                        pin.Position = new Position(latitute, longitude);
                        pin.Label = " ";


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

                        });
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
                    }
                    await Task.Delay(500);//aggiorno la posizione ogni 500 millisecondi
                }
            }, TaskCreationOptions.LongRunning);
        }
    }
}
