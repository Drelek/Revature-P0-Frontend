import React from 'react';
import { Image, StyleSheet, View } from 'react-native';


const Logo: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        resizeMode='contain'
        style={styles.logo}
        source={require('./images/opo.jpg')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },

  logo: {
    height: 50,
    width:"75%"

  }
});

export default Logo;