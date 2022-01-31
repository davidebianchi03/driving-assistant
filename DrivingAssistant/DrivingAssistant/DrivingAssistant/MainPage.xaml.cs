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
            waitForGPSFrame.IsVisible = true;
            //aspetto che il telefono si connetta al gps
            Task<Location> location = null;
            while (location == null)
            {
                try
                {
                    location = Geolocation.GetLocationAsync();
                }
                catch (Exception ex) { }
            }
            waitForGPSFrame.IsVisible = false;

            //inizio ad aggiornare la posizione in tempo reale
            LivePosition();

        }

        private void BtnNavigateClick(object sender, EventArgs e)
        {
            navigateFrame.IsVisible = true;
        }

        private void BtnCancelClick(object sender, EventArgs e)
        {
            navigateFrame.IsVisible = false;
        }

        //metodo per visualizzare in tempo reale la posizione dell'utente sulla mappa
        private void LivePosition()
        {
            Task.Factory.StartNew(async () =>
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
                    pin.Icon
                    

                    //aggiorno il pin sulla mappa
                    Device.BeginInvokeOnMainThread(() =>
                    {
                        if (map.Pins.Count == 0)
                            map.Pins.Add(pin);
                        else
                            map.Pins[0] = pin;

                            //aggiorno la porzione di mappa visualizzata
                            map.MoveToRegion(MapSpan.FromCenterAndRadius(new
                        Xamarin.Forms.Maps.Position(latitute, longitude),
                        Distance.FromMiles(0.1)));
                    });
                }
                await Task.Delay(500);//aggiorno la posizione ogni secondo
                LivePosition();
            });
        }
    }
}
