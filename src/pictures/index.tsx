import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/core';

const index = ({route}: any) : JSX.Element => {

  const navigation : any = useNavigation();


  const savePicture : (photo: string) => Promise<void> = async(photo: string) => {

    // distruct status
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

    // save the picture/video
    if(status === 'granted'){

      const asset = await MediaLibrary.createAssetAsync(photo);

      // set the pictrue to albume and save it
      await MediaLibrary.createAlbumAsync('expo albume', asset)
      ?alert('saved success')
      :alert('error')

    }else{
      alert('don\'t have permission')
    }
    // back to home (camera screen)
    navigation.navigate('camera');
  }

  return (
    <View style={{flex: 1}}>
        
      <Image source={{uri: route.params.photo}} style={{flex: 1, borderWidth: 2}} />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

        {/* back to camera scrren */}
        <TouchableOpacity
          onPress={() => savePicture(route.params.photo)}
          style={styles.button}
        >
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>

        {/* save picture then back to camera screen */}
        <TouchableOpacity
          onPress={()=>navigation.navigate('camera')}
          style={styles.button}
        >
          <Text style={styles.text}>Save</Text>
        </TouchableOpacity>

      </View>

    </View>
  )
}

export default index

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 30, paddingVertical: 15, backgroundColor: '#f008'
  },
  text: {
    color: '#fff', fontSize: 20, textAlign: 'center'
  }
})