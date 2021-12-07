import React, { useRef } from 'react';
import { StackScreenProps } from '@react-navigation/stack'
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import { Video } from 'expo-av';

const index = ({route, navigation}: any) : JSX.Element => {

  // save the picture/video on device
  const savePicture : (photo: string) => Promise<void> = async(photo: string) => {
    // distruct status
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    // save the picture/video
    if(status === 'granted'){
      // add photo/video to assets
      const asset = await MediaLibrary.createAssetAsync(photo);
      // set the pictrue to albume and save it
      MediaLibrary.createAlbumAsync('expo albume', asset)
    }else{//somthing wrong
      Alert.alert('don\'t have permission')
    }
    // back to home (camera screen)
    navigation.navigate('camera');
  }

  const { video, photo } = route.params;

  return (
    <View style={{flex: 1}}>
        
      {
      video
        ?<Video source={{uri:video}} style={{flex: 1}} useNativeControls />
        :<Image source={{uri: photo}} style={{flex: 1}}/>
      }

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

        {/* back to camera scrren */}
        <TouchableOpacity
          onPress={()=>navigation.navigate('camera')}
          style={styles.button}
        >
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>

        {/* save picture then back to camera screen */}
        <TouchableOpacity
          onPress={() => savePicture(photo?photo:video)}
          style={styles.button}
        >
          <Text style={styles.text}>Save</Text>
        </TouchableOpacity>

      </View>

    </View>
  )
}

export default React.memo(index)

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 30, paddingVertical: 15, backgroundColor: '#f008'
  },
  text: {
    color: '#fff', fontSize: 20, textAlign: 'center'
  }
})