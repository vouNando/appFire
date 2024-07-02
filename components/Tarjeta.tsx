import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Tarjeta(props: any) {
    console.log(props.usuario.email );
  return (
    <View style={styles.container}>
      <Text>{props.usuario.nombre}</Text>
      <Text>{props.usuario.email}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#4D869C',
        alignItems: 'center',
        justifyContent: 'center',
    },
})