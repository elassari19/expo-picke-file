import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable } from 'react-native';
import { Camera } from 'expo-camera';
import { CameraType, FlashMode } from 'expo-camera/build/Camera.types';
// import * as ImagePicker from 'expo-image-picker';

export default function App(): JSX.Element {

  const [camera, setCamera] = useState<any>();
  const [type, setType] = useState <CameraType>(Camera.Constants.Type.back);
  const [flash, setFlash] = useState<FlashMode>(Camera.Constants.FlashMode.auto);
  const [photo, setPhoto] = useState<string>('');
console.log(camera);
  useEffect(() => {
    (async () => {
      const {status} = await Camera.requestCameraPermissionsAsync() ;
      setCamera(status === 'granted');
    })();
  }, []);

  // function to take the pictures
  const pictures = async():Promise<void> =>{
    let photo = camera && await camera.takePictureAsync();
    setPhoto(photo.uri);
  }

  // function to save the pictures in phone library
  const handleSave = async():Promise<void> => {
    
  }

  // function to save the pictures in phone library
  const handleDelet = async():Promise<void> => {
    
  }

  // no camera on device
  if (camera === null) {
    return <View />;
  }

  // don't have permission
  if (camera === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} 
        ref={ref=>setCamera(ref)}
        type={type} flashMode={Camera.Constants.FlashMode.off}
        autoFocus={Camera.Constants.AutoFocus.on}
        ratio={'16:9'}
      >

        <View style={styles.buttonContainer}>

          {/* handle front or back camera */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>

          {/* handle flash of camera */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setFlash(
                flash === Camera.Constants.FlashMode.auto
                  ? Camera.Constants.FlashMode.on
                  : Camera.Constants.FlashMode.off
              );
            }}>
            <Text style={styles.text}> Flash </Text>
          </TouchableOpacity>

          {/* take a picture */}
          <TouchableOpacity
            style={styles.button}
            onPress={pictures}>
            <Text style={styles.text}> Take picture </Text>
          </TouchableOpacity>

        </View>
      </Camera>
      <View style={{flex: 1}}>
        {
          photo ? <Image style={{flex:1}} source={{uri: photo}} />
          : <Text>no image exist</Text>
        }
        <View style={{flexDirection: 'row' ,justifyContent: 'space-between'}}>
          <Pressable onPress={handleDelet}>Delete</Pressable>
          <Pressable onPress={handleSave}>Save</Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  camera: {
    flex: 1,
    width: '100%'
  },
  buttonContainer: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    bottom: 0,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    color: '#d00',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});