import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions,Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

export default function Cam() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.front);
  const [flagPhoto,setFPhoto] = useState(false)
  const [flagVisage,setFlagVisage] = useState(false)
  const [nose,setNose]= useState({x:0,y:0})

  const takePicture = async () => {
    await Camera.current.takePictureAsync()

  }
    const onCameraReady = () => {
        setFPhoto(true);
    };

    const onDetect = (e) => {

       console.log(e.faces[0].bounds)
       if (e.faces.length>0)
    {   setFlagVisage(true)
        setNose({'x':e.faces[0].noseBasePosition.x,'y':e.faces[0].noseBasePosition.y})
    }
        else
        setFlagVisage(false)
    console.log(nose)
    }


      useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} onCameraReady={onCameraReady}
      onFacesDetected={onDetect} faceDetectorSettings={{
        mode: FaceDetector.FaceDetectorMode.fast,
        detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
        runClassifications: FaceDetector.FaceDetectorClassifications.all,
        minDetectionInterval: 100,
        tracking: true,
      }}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(type === CameraType.back ? CameraType.front : CameraType.back);
            }}>
                <Text style={styles.text}>
            {type === CameraType.back ?  '📷'
            : '🤳'
            }
            </Text>
          </TouchableOpacity>
          <Text style={styles.text}>{(flagVisage) && '🤡'}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              takePicture();
            }}>
                <Text style={styles.text}>
                    {(flagPhoto) ?'⏺️' :'🚫'  } 
                    </Text>
          </TouchableOpacity>
        </View>
        
      </Camera>
        <View style={{position: 'absolute', top:nose.y-50, left: nose.x-50, right: 0, bottom: 0}}>
            <Image        style={styles.img} source={require('../assets/nez.png')}/>
        </View>
        <View style={{position: 'absolute', top:nose.y-50, left: nose.x-50, right: 0, bottom: 0}}>
            <Image        style={styles.lapin} source={require('../assets/nez.png')}/>
        </View>
        
    </View>
  );
}
const window = Dimensions.get('window');
console.log(window)
const styles = 
StyleSheet.create({
    text: {
        fontSize:30

    },
    img:{
        height:80,
        width:80
    },
    lapin:{
        height:80,
        width:80
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
        width:40,
        height:40,
        backgroundColor:'white',
        margin:10
    },
    camera : {
        height:window.height-50,
        width : window.width
    }
  });
  