import React, { useState } from 'react';
import { Pressable, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import User from '../models/User';
import { CreateUserAction, LoginAction } from '../redux/actions/UserActions';
import { View, Text , StyleSheet} from 'react-native';
import { Button, Card, Input } from 'react-native-elements';

export default function LoginCard() {
  const dispatch = useDispatch();
  const [loginInfo, setLoginInfo] = useState({
    apiKey: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  function login() {
    dispatch(new LoginAction(loginInfo.apiKey).toPlainObject());
  }

  function createUser() {
    if (loginInfo.email != "" && loginInfo.firstName != "" && loginInfo.lastName !="" ){
    dispatch(new CreateUserAction(new User(loginInfo)).toPlainObject());
  }else{
    alert("Login info not valid");
  }
  }
  return (
    <View>
      <Card containerStyle={styles.loginCard} wrapperStyle={styles.cardItems}>
        <Card.Title>Create an account</Card.Title>
        <Card.Divider />
        <Input inputStyle={styles.inputs}
          onChangeText={(text) =>
            setLoginInfo({ ...loginInfo, firstName: text })
          }
          placeholder="First Name"
        />
        <Input 
          
          inputStyle={styles.inputs}
          onChangeText={(text) =>
            setLoginInfo({ ...loginInfo, lastName: text })
          }
          placeholder="Last Name"
        />
        <Input inputStyle={styles.inputs}
          onChangeText={(text) => setLoginInfo({ ...loginInfo, email: text })}
          placeholder="Email"
          autoCapitalize="none"
        />
        <Button buttonStyle={styles.button} title="Create Account" onPress={createUser} />
      </Card>

      <Card containerStyle={styles.loginCard} wrapperStyle={styles.cardItems}>
        <Card.Title>Already have an API key? Enter it here</Card.Title>
        <Card.Divider />
        <Input inputStyle={styles.inputs}
          onChangeText={(text) => setLoginInfo({ ...loginInfo, apiKey: text })}
          placeholder="API Key"
          autoCapitalize="none"
        />
        <Button buttonStyle={styles.button} title="Login" onPress={login} />
      </Card>
    </View>
  );
}
const styles = StyleSheet.create({
  loginCard:{
    backgroundColor: '#fffffe',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 5,

  },
  cardItems:{
    
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 5,

  },
  inputs:{
    fontSize:14,
    padding:5,
    backgroundColor: '#fffffe',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 2,
    

  },
  button:{
    backgroundColor:"#123456",
    alignSelf:'center',
    margin:5,
    borderRadius:10,
    width:"90%",
  }

});
  
