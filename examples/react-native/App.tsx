/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { StatusBar } from 'expo-status-bar';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import React, {useState} from 'react';

import {sdk} from './webSdk';

export default function App() {
  const [auth, setAuth] = useState({});


  return (
     <View>
      <StatusBar
      style='auto'
        // style={isDarkMode ? 'light' : 'dark'}
        // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        // backgroundColor={backgroundStyle.backgroundColor}
      />
      
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        // style={backgroundStyle} 
      >
      {/* <Header />   */}
        <View
          // style={{
          //   backgroundColor: isDarkMode ? Colors.black : Colors.white,
          // }}
          >
          <Text style={styles.welcome}>Proton SDK example</Text>
          <Text style={styles.instructions}>Auth: {JSON.stringify(auth)}</Text>

          {Object.keys(auth).length > 0 ? (
            <>
              <Button
                title="Transfer"
                onPress={async () => await sdk.transfer()}
              />

              <Button
                title="Logout"
                onPress={async () => {
                  await sdk.logout();
                  setAuth({});
                }}
              />
            </>
          ) : (
            <Button
              title="Login"
              onPress={async () => {
                await sdk.login();
                console.log(sdk.session);
                if (sdk.session) {
                  setAuth(sdk.session.auth);
                }
              }}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


