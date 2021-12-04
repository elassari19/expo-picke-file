import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App(): JSX.Element {

  const [galleryPermission, setGalleryPermission] = useState<any>('');
  const [image, setImage] = useState<string>('');

  useEffect(() => {
    (async (): Promise<void> => {

      // check the permission of oper gallery
      const galleryStatus = (await ImagePicker.requestMediaLibraryPermissionsAsync()).status;
      if (galleryStatus !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }else{setGalleryPermission(galleryStatus !== 'granted')}

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

      <View style={styles.buttonContainer}>

        <Pressable onPress={pickImage}>
          <Text>Pick image or video from gallery</Text>
        </Pressable>
        <Text>
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </Text>

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
    // ...StyleSheet.absoluteFillObject,
    position: 'relative',
    top: Dimensions.get('window').height-100,
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  button: {
    flex: 1,
  },
  text: {
    flex: 1,
    fontSize: 18,
    padding: 10,
  },
  picker: {
    top: Dimensions.get('window').height-260,
    backgroundColor: 'red',
    padding: 20,
    fontSize: 24
  }
});