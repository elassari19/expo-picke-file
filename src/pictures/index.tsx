import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const index = ({route}: any) : JSX.Element => {

  const navigation : any = useNavigation();

  const handleBack = () : void => {
    navigation.navigate('camera');
  }

  return (
    <View style={{flex: 1}}>
        
      <Image source={{uri: route.params.photo}} style={{flex: 1, borderWidth: 2}} />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

        <TouchableOpacity
          onPress={handleBack}
          style={styles.button}
        >
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleBack}
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