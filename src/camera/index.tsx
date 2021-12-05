import { CameraType, FlashMode } from 'expo-camera/build/Camera.types';
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
// import { Audio } from 'expo-av';
// import * as MediaLibrary from 'expo-media-library';

const index = ({navigation}:any): JSX.Element => {

  const [cameraPermission, setCameraPermission] = useState<any>(false);
  const [galleryPermission, setGalleryPermission] = useState<boolean>(false);
  const [audioPermission, setAudioPermission] = useState<boolean>(false);
  const [type, setType] = useState <CameraType>(Camera.Constants.Type.back);
  const [flash, setFlash] = useState<FlashMode>(Camera.Constants.FlashMode.on);
  const [photo, setPhoto] = useState<string>('');

  useEffect(() => {
    (async (): Promise<void> => {

      // check permission of camera
      const camera = await Camera.requestCameraPermissionsAsync() ;
      setCameraPermission(camera.status === 'granted');

      // // check permission of audio
      // const audio = await Camera.requestCameraPermissionsAsync() ;
      // setAudioPermission(audio.status === 'granted');

      // // check permission of gallery
      // const gallery = await Camera.requestCameraPermissionsAsync() ;
      // setGalleryPermission(gallery.status === 'granted');

    })();

  }, [photo]);

  // take pictures
  const pictures = async():Promise<void> =>{
    let photos = cameraPermission && await cameraPermission.takePictureAsync();
    setPhoto(photos.uri);
    navigation.navigate('picture',{photo:photos.uri})
  }

  // no camera on device
  if (cameraPermission === null) {
    return <View />;
  }

  // don't have permission
  if (cameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} 
        ref={ref=>setCameraPermission(ref)}
        type={type} flashMode={flash}
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
                flash === Camera.Constants.FlashMode.auto || flash === Camera.Constants.FlashMode.off
                  ? Camera.Constants.FlashMode.on
                  : Camera.Constants.FlashMode.off
              );
            }}>
            <Text style={styles.text}> Flash {flash} </Text>
          </TouchableOpacity>

          {/* take a picture */}
          <TouchableOpacity
            style={styles.button}
            onPress={pictures}>
            <Text style={styles.text}> picture </Text>
          </TouchableOpacity>

          {/* picke a picture */}
          <TouchableOpacity
            style={styles.button}
            onPress={()=>navigation.navigate('picker')}>
            <Text style={styles.text}> picker </Text>
          </TouchableOpacity>

        </View>

      </Camera>

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
    width: '100%',
    zIndex: 10,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    color: '#d00',
    padding: 10,
    top: Dimensions.get('window').height - 150,
  },
  button: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    borderWidth: 1,
    padding: 10
  },
});