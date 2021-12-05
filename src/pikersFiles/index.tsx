import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';

const index = ({navigation}:any): JSX.Element => {

  const [cameraPermission, setCameraPermission] = useState<any>(false);
  const [galleryPermission, setGalleryPermission] = useState<any>('');
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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  // don't have permission
  if (galleryPermission === false ) {
    return <Text>No access to Gallery</Text>;
  }

  return (
    <View style={styles.container}>

          {image!=='' && <Image source={{ uri: image }} style={{ flex: 1}} />}

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

export default index;

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