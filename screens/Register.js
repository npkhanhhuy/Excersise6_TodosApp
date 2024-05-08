import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import auth from '@react-native-firebase/auth'

const Register = () => {
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")
    const handleCreateAccount=()=>(
        auth().createUserWithEmailAndPassword(email, password)
        .then(()=>Alert.alert("Đăng ký thành công"))
        .catch(e=>Alert.alert(e.message))
    )
  return (
    <View style={{flex:1, justifyContent:"center"}}>
      <TextInput
        label={"Email"}
        value={email}
        onChangeText={setEmail}
      />
        <TextInput
        label={"Password"}
        value={password}
        onChangeText={setPassword}
      />
      <Button mode="contained"
        onPress={handleCreateAccount}
      >
        Create Account
      </Button>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({})