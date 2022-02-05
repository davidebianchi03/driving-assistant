using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Interop;
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

            OpenFileDialog ofd = new OpenFileDialog();

            //if (ofd.ShowDialog() == true)
            //{
            capture = new VideoCapture("D:\\Paci\\GitHub\\video1.mp4");
            capture.ImageGrabbed += Capture_ImageGrabbed;
            capture.Start();

            //captureImage();
            // }
        }


        private void Capture_ImageGrabbed(object sender, EventArgs e)
        {
            Image<Bgr, Byte> image = capture.QueryFrame().ToImage<Bgr, Byte>();
            Image<Gray, Byte> grayScaleImage = image.Convert<Gray, Byte>();
            Image<Gray, Byte> blurredImage = grayScaleImage.SmoothBlur(2, 5);
            Image<Gray, Byte> cannyImage = blurredImage.Canny(50, 50);
            Bitmap bitmap = cannyImage.ToBitmap();

            Dispatcher.Invoke(() => { imgTemp.Source = Convert(bitmap); });

            // imgTemp.Source = BitmapSourceConvert
            Thread.Sleep(33);
        }

        public BitmapImage Convert(Bitmap src)
        {
            MemoryStream ms = new MemoryStream();
            ((System.Drawing.Bitmap)src).Save(ms, System.Drawing.Imaging.ImageFormat.Bmp);
            BitmapImage image = new BitmapImage();
            image.BeginInit();
            ms.Seek(0, SeekOrigin.Begin);
            image.StreamSource = ms;
            image.EndInit();
            return image;
        }
    }
}
