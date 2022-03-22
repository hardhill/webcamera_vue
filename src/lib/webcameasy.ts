export class WebCam{
    _webcamElement:HTMLVideoElement
    _canvasElement:HTMLCanvasElement | null
    _snapSoundElement:HTMLAudioElement | null
    _webcamList:MediaDeviceInfo[]
    _streamList:MediaStream[]
    _selectedDeviceId:string
    _facingMode = 'user'
    constructor(webcamElement:HTMLVideoElement, canvasElement:HTMLCanvasElement | null = null, snapSoundElement:HTMLAudioElement | null = null) {
        this._webcamElement = webcamElement;
        this._webcamElement.width = this._webcamElement.width || 640;
        this._webcamElement.height = this._webcamElement.height || this._webcamElement.width * (3 / 4);
        this._webcamList = [];
        this._streamList =[];
        this._selectedDeviceId = '';
        this._canvasElement = canvasElement;
        this._snapSoundElement = snapSoundElement;
    }

    /*
      1. Get permission from user
      2. Get all video input devices info
      3. Select camera based on facingMode 
      4. Start stream
    */
      async start(startStream = true) {
        return new Promise((resolve, reject) => {         
          this.stop();
          navigator.mediaDevices.getUserMedia(this.getMediaConstraints()) //get permisson from user
            .then(stream => {
              this._streamList.push(stream);
              this.info() //get all video input devices info
                .then(webcams =>{
                  this.selectCamera();   //select camera based on facingMode
                  if(startStream){
                      this.stream()
                          .then(facingMode =>{
                              resolve(this._facingMode);
                          })
                          .catch(error => {
                              reject(error);
                          });
                  }else{
                      resolve(this._selectedDeviceId);
                  }
                }) 
                .catch(error => {
                  reject(error);
                });
            })
            .catch(error => {
                reject(error);
            });
        });
      }
    /* Start streaming webcam to video element */ 
    async stream() {
        return new Promise((resolve, reject) => {         
          navigator.mediaDevices.getUserMedia(this.getMediaConstraints())
            .then(stream => {
                this._streamList.push(stream);
                this._webcamElement.srcObject = stream;
                if(this._facingMode == 'user'){
                  this._webcamElement.style.transform = "scale(-1,1)";
                }
                this._webcamElement.play();
                resolve(this._facingMode);
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
        });
      }
    /* Select camera based on facingMode */ 
    selectCamera(){
        for(let webcam of this._webcamList){
          if(   (this._facingMode=='user' && webcam.label.toLowerCase().includes('front'))
            ||  (this._facingMode=='enviroment' && webcam.label.toLowerCase().includes('back'))
          )
          {
            this._selectedDeviceId = webcam.deviceId;
            break;
          }
        }
      }
     
    /* Get all video input devices info */ 
    async info(){
        return new Promise((resolve, reject) => {            
          navigator.mediaDevices.enumerateDevices()
            .then(devices =>{
              this.getVideoInputs(devices);
              resolve(this._webcamList);
            }) 
            .catch(error => {
              reject(error);
            });
        });
    }
    getVideoInputs(mediaDevices: MediaDeviceInfo[]) {
        this._webcamList = [];
        mediaDevices.forEach(mediaDevice => {
        if (mediaDevice.kind === 'videoinput') {
          this._webcamList.push(mediaDevice);
        }
      });
      if(this._webcamList.length == 1){
        this._facingMode = 'user';
      }    
      return this._webcamList;
    }

    /* Get media constraints */
    getMediaConstraints():MediaStreamConstraints {
        var videoConstraints:VideoConstraints = {facingMode:'',deviceId:{}};
        if (this._selectedDeviceId == '') {
            videoConstraints.facingMode =  this._facingMode;
        } else {
            videoConstraints.deviceId = { exact: this._selectedDeviceId};
        }
        var constraints = {
            video: videoConstraints,
            audio: false
        };
        return constraints;
    }
    /* Stop streaming webcam */ 
    stop() {
        this._streamList.forEach(stream => {
          stream.getTracks().forEach(track => {
            track.stop();
          });
        });   
      }

}

type VideoConstraints = {
    facingMode:string,
    deviceId:object
}