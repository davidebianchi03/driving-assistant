using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace DrivingAssistant
{
    public partial class MainPage : ContentPage
    {

        public MainPage()
        {
            InitializeComponent();
            navigateFrame.IsVisible = false;//nascondo di default il frame per l'inserimento del punto di partenza e della destinazione
        }

        private void BtnNavigateClick(object sender, EventArgs e)
        {
            navigateFrame.IsVisible = true;
        }

        private void BtnCancelClick(object sender, EventArgs e)
        {
            navigateFrame.IsVisible = false;
        }
    }
}
