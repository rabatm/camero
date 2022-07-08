import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions,Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

export default function Cam() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.front);
  const [flagPhoto,setFPhoto] = useState(false)
  const [flagVisage,setFlagVisage] = useState(false)
  const [flagNez,setFlagNez] = useState(false)
  const [flagLapin,setFlagLapin] = useState(false)
  const [camera, setCamera] = useState(null);
  const [nose,setNose]= useState({x:0,y:0})
  const [lapin,setLapin]= useState({width:0,height:0,x:0,y:0})
  const [image, setImage] = useState(null);

  
  const takePicture = async () => {
    if(camera){
        const data = await camera.takePictureAsync(null)
        setImage(data.uri);
    }

  }
    const onCameraReady = () => {
        setFPhoto(true);
    };

    const onDetect = (e) => {

       if (e.faces.length>0)
    {   setFlagVisage(true)
        setLapin({width:e.faces[0].bounds.size.width,height:0,x:e.faces[0].bounds.origin.x,y:e.faces[0].bounds.origin.y})
        setNose({'x':e.faces[0].noseBasePosition.x,'y':e.faces[0].noseBasePosition.y})
    }
        else
        setFlagVisage(false)
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
      onFacesDetected={onDetect} ref={ref => setCamera(ref)} faceDetectorSettings={{
        mode: FaceDetector.FaceDetectorMode.fast,
        detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
        runClassifications: FaceDetector.FaceDetectorClassifications.all,
        minDetectionInterval: 100,
        tracking: true,
      }}>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonStyle}>
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
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                setFlagNez(flagNez ? false : true);
                }}>
                    <Text>🐽</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                setFlagLapin(flagLapin ? false : true);
                }}>
                    <Text>🐰</Text>
            </TouchableOpacity>
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
          <Text style={styles.text}>{(flagVisage) && '🤡'}</Text>
        </View>
      </Camera>
      {(image!==null) && 
      <View>
        <Image source={{uri: image}} style={styles.picture}/>
        <View style={{flex:0,flexDirection:'row',justifyContent:'center'}}>
            <TouchableOpacity style={styles.button} onPress={() => {
                setImage(null)
                console.log(image,"d")
                }}>
                <Text style={styles.c}>❌</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {
                setImage(null)
                console.log(image,"d")
                }}>
                <Text style={styles.c}>💾</Text>
            </TouchableOpacity>
        </View>
      </View>
      }
      {(flagNez) && 
        <View style={{position: 'absolute', top:nose.y-50, left: nose.x-50, right: 0, bottom: 0}}>
            <Image        style={styles.img} source={require('../assets/nez.png')}/>
        </View>
        }
        {(flagLapin) && 
        <Image        style={{height:lapin.width,width:lapin.width,position: 'absolute', top:lapin.y-200, left: lapin.x}} source={require('../assets/lapin.png')}/>
        }
        
    </View>
  );
}
const window = Dimensions.get('window');
const styles = 
StyleSheet.create({
    buttonContainer : {
        flex:1,
        top:20
    },
    buttonStyle : {
        flex:1,
        flexDirection: "row"
    },
    text: {
        fontSize:30

    },
    img:{
        height:80,
        width:80
    },
    c:{
        fontSize:30,
        textAlign:'right'
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
        textAlign:'center'

    },
    camera : {
        height:window.height,
        width : window.width,
        flex:1
    },
    picture : {
        height:window.height,
        width : window.width,
        flex:1
    }
  });
  