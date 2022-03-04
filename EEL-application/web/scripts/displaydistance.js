$(document).ready(function(){
    //nascondo tutte le indicazioni dei pericoli
    $("#back-left-1").hide();
    $("#back-center-1").hide();
    $("#back-right-1").hide();

    $("#back-left-2").hide();
    $("#back-center-2").hide();
    $("#back-right-2").hide();

    $("#back-left-3").hide();
    $("#back-center-3").hide();
    $("#back-right-3").hide();

    $("#front-left-1").hide();
    $("#front-center-1").hide();
    $("#front-right-1").hide();

    $("#front-left-2").hide();
    $("#front-center-2").hide();
    $("#front-right-2").hide();

    $("#front-left-3").hide();
    $("#front-center-3").hide();
    $("#front-right-3").hide();
});

function SetFrontLeftLevel(level){//0 -> niente, 1 -> lontano, 2 -> abbastanza lontano, 3 -> vicino
    if(level == 1){
        $("#front-left-1").show();
        $("#front-left-2").hide();
        $("#front-left-3").hide();
    }
    else if (level == 2){
        $("#front-left-1").show();
        $("#front-left-2").show();
        $("#front-left-3").hide();
    }
    else if (level == 3){
        $("#front-left-1").show();
        $("#front-left-2").show();
        $("#front-left-3").show();
    }
    else{
        $("#front-left-1").hide();
        $("#front-left-2").hide();
        $("#front-left-3").hide();
    }
}

function SetFrontCenterLevel(level){//0 -> niente, 1 -> lontano, 2 -> abbastanza lontano, 3 -> vicino
    if(level == 1){
        $("#front-center-1").show();
        $("#front-center-2").hide();
        $("#front-center-3").hide();
    }
    else if (level == 2){
        $("#front-center-1").show();
        $("#front-center-2").show();
        $("#front-center-3").hide();
    }
    else if (level == 3){
        $("#front-center-1").show();
        $("#front-center-2").show();
        $("#front-center-3").show();
    }
    else{
        $("#front-center-1").hide();
        $("#front-center-2").hide();
        $("#front-center-3").hide();
    }
}

function SetFrontRightLevel(level){//0 -> niente, 1 -> lontano, 2 -> abbastanza lontano, 3 -> vicino
    if(level == 1){
        $("#front-right-1").show();
        $("#front-right-2").hide();
        $("#front-right-3").hide();
    }
    else if (level == 2){
        $("#front-right-1").show();
        $("#front-right-2").show();
        $("#front-right-3").hide();
    }
    else if (level == 3){
        $("#front-right-1").show();
        $("#front-right-2").show();
        $("#front-right-3").show();
    }
    else{
        $("#front-right-1").hide();
        $("#front-right-2").hide();
        $("#front-right-3").hide();
    }
}

function SetBackLeftLevel(level){//0 -> niente, 1 -> lontano, 2 -> abbastanza lontano, 3 -> vicino
    if(level == 1){
        $("#back-left-1").show();
        $("#back-left-2").hide();
        $("#back-left-3").hide();
    }
    else if (level == 2){
        $("#back-left-1").show();
        $("#back-left-2").show();
        $("#back-left-3").hide();
    }
    else if (level == 3){
        $("#back-left-1").show();
        $("#back-left-2").show();
        $("#back-left-3").show();
    }
    else{
        $("#back-left-1").hide();
        $("#back-left-2").hide();
        $("#back-left-3").hide();
    }
}

function SetBackCenterLevel(level){//0 -> niente, 1 -> lontano, 2 -> abbastanza lontano, 3 -> vicino
    if(level == 1){
        $("#back-center-1").show();
        $("#back-center-2").hide();
        $("#back-center-3").hide();
    }
    else if (level == 2){
        $("#back-center-1").show();
        $("#back-center-2").show();
        $("#back-center-3").hide();
    }
    else if (level == 3){
        $("#back-center-1").show();
        $("#back-center-2").show();
        $("#back-center-3").show();
    }
    else{
        $("#back-center-1").hide();
        $("#back-center-2").hide();
        $("#back-center-3").hide();
    }
}

function SetBackRightLevel(level){//0 -> niente, 1 -> lontano, 2 -> abbastanza lontano, 3 -> vicino
    if(level == 1){
        $("#back-right-1").show();
        $("#back-right-2").hide();
        $("#back-right-3").hide();
    }
    else if (level == 2){
        $("#back-right-1").show();
        $("#back-right-2").show();
        $("#back-right-3").hide();
    }
    else if (level == 3){
        $("#back-right-1").show();
        $("#back-right-2").show();
        $("#back-right-3").show();
    }
    else{
        $("#back-right-1").hide();
        $("#back-right-2").hide();
        $("#back-right-3").hide();
    }
}