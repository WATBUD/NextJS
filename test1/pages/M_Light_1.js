// HSL即色相、飽和度、亮度（英語：Hue, Saturation, Lightness）。
// HSV即色相、飽和度、明度（英語：Hue, Saturation, Value），又稱HSB其中B即英語：Brightness。
//Louis Architecture => Hex=>SET RGB=>SET HSV
export class M_Light_CS111 {
    maxkaycapNumber = 0
    repeater;
    AllBlockColor= []
    lightData={
        translate:'GloriousMode',
        PointEffectName:'GloriousMode',
        colorPickerValue:[255,0,0,1],
        brightness:100,
        speed:50,
    };
    hasSingleKeyLighting=false;
    animationSpeed=1;
    currentBlockIndex=0;
    minKeyWidth=43;
    minKeyHeight=41;
    settingPerkeyName=''
    imageMaxWidth=0;
    imageMaxHeight=0;
    recordModeArr= []
    currentModeIndex= 0
    twoDimensionalArray=new Array(26);//8*26;
    KeyTableArray=[];
    qigong_Step2_Range=[22,23, 38,52,51 ,36];
    qigong_Step1_Range=[0,15,30,58,71,82];
    BreathTempArray=[];
    centerBlockPoint=37;
    break_DimensionalArray=[];
    max_X_Number=26;
    max_Y_Number=8;
}
