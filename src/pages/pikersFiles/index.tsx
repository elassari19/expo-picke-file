import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable, Dimensions, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';

const index = ({navigation}:any): JSX.Element => {

  const [cameraPermission, setCameraPermission] = useState<any>(false);
  const [image, setImage] = useState<string>('');

  useEffect(() => {
    (async (): Promise<void> => {

      // check permission of camera
      const camera = await Camera.requestCameraPermissionsAsync() ;
      setCameraPermission(camera.status === 'granted');
    })();

  }, []);

  // function for handle the image picker
  const pickImage = async (): Promise<void> => {
     // ask permission of camera
     if(!cameraPermission){
     const camera = await Camera.requestCameraPermissionsAsync() ;
     setCameraPermission(camera.status === 'granted');
    }
    // pick picture/video from device
    let result = await ImagePicker.launchImageLibraryAsync({
      // type media image or video or both
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    // save media on state
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>

      <View style={{flex: 1}}>
        {
        /mov$/.test(`${image}`)
          ? <Video source={{uri: image}} style={{flex: 1}} useNativeControls />
          : <Image source={{ uri: image }} style={{ flex: 1}} />
        }
      </View>

      <View style={styles.buttonContainer}>

        <Pressable style={styles.button} onPress={pickImage}>
          <Text>Picke</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={()=>navigation.navigate('camera')}>
          <Text>back</Text>
        </Pressable>

      </View>
    </View>
  );
}

export default React.memo(index);

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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    color: '#d00',
    padding: 10,
  },
  button: {
    flex: 1,
    margin: 5,
    padding: 10,
    textAlign: 'center',
    backgroundColor: '#f115'
  },
  text: {
     fontSize: 20,
     textAlign: 'center'
  },
});