import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import api from './Services/Apis'
import axios from 'axios';


export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned =  ({ type, data }) => {
    setScanned(true);
    let arr = data.split(" ")
    
    const info = {
      type: arr[0],
      depot: arr[1]
    }

    // setTimeout(function(){
    //   var response = api.Add()
    //   console.log(response)}
    //   ,3000)
      
    // var response = await api.Add()
    // if(response){
    //   console.log("RESPONSE => " + response.data)
    // }
    // else{
    //   console.log("RES => " + response)
    // }
    

    axios.post("http://192.168.147.1:8080/api/add")
    .then(response => {
      console.log(response)
      if(arr.length === 2){
        Alert.alert("",`Waste Type: ${arr[0]}\nDepot no: ${arr[1]}`)
      }
      else{
        Alert.alert("","Type or Depot no missing")
      }
    })
    .catch(err => {
      console.log(err)
    })

    
    
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { Scanner } from './Scanner'

// export default function App() {
//   return (
//     <View style={styles.container}>
//       {/* <Text>Open up App.js to start working on your app!</Text> */}
//       <Scanner/>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
