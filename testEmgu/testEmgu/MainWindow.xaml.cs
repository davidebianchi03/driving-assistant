using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using Emgu.CV;
using Emgu.CV.Structure;
using Microsoft.Win32;

namespace testEmgu
{
    /// <summary>
    /// Logica di interazione per MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private VideoCapture capture;
        public MainWindow()
        {
            InitializeComponent();

            OpenFileDialog file = new OpenFileDialog();
            //file.FileName = "‪E:\\Paci\\video.mp4";
            //if (file.ShowDialog() == true)
            //{

            //}

            capture = new VideoCapture("E:\\Paci\\video.avi");


            capture.ImageGrabbed += Capture_ImageGrabbed;
            capture.Start();
        }

        private void Capture_ImageGrabbed(object sender, EventArgs e)
        {
            Image<Bgr, Byte> image = capture.QueryFrame().ToImage<Bgr, Byte>();

            MemoryStream ms = new MemoryStream();
            ms.Write(image.ToJpegData(), 0, image.ToJpegData().Length);

            BitmapImage outImage = new BitmapImage();
            outImage.BeginInit();
            outImage.StreamSource = ms;
            outImage.EndInit();

            outImage.Freeze();

            //imgTemp.Source = outImage;
            Bitmap map = image.ToJpegData();
            imgTemp = (Image)image;

            imgTemp.Source = new BitmapImage(image.ToBitmap());
            //image.Save(ms, ImageFormat.Png);



            //imgTemp.Source = image;
            //throw new NotImplementedException();
        }
    }
}
