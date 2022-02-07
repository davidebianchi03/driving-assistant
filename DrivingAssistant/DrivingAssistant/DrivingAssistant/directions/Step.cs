using System;
using System.Collections.Generic;
using System.Text;

namespace DrivingAssistant.directions
{
    class Step
    {
        //classe contenente i comandi che il navigatore deve dare al guidatore
        public float Distance { get; set; } //distanza dal comando dal precedente in metri
        public string Instruction { get; set; }//istruzione da dire al guidatore

        public float Duration { get; set; }//durata della manovra in secondi
        
        public GpsCoordinates Coordinates { get; set; }//coordinate della svolta

        public Step()
        {
            this.Distance = 0;
            this.Instruction = "";
            Duration = 0;
        }

        public Step(float Distance, string Instruction, float Duration, GpsCoordinates v)
        {
            this.Distance = Distance;
            this.Instruction = Instruction;
            this.Duration = Duration;
            this.Coordinates = Coordinates;
        }

    }
}
