import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Permissions from 'expo-permissions'
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class Scanner extends React.Component{

constructor(){
    super()
    this.state={
        hasCameraPermission:null,
        scanned:false,
        scannedData:'',
        buttonState:'normal'
    }
}

getCameraPermissions = async (id) =>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    
    this.setState({
      /*status === "granted" is true when user has granted permission
        status === "granted" is false when user has not granted the permission
      */
      hasCameraPermissions: status === "granted",
      buttonState: id,
      scanned: false
    });
  }

  handleBarCodeScanned = async({type, data})=>{
   const{buttonState} = this.state
   
    this.setState({
      scanned:true,
      scannedData: data,
      buttonState: 'normal'
    });
  }

render(){
    const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;
if(buttonState !== "normal" && hasCameraPermissions){
  return(
    <BarCodeScanner
    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
    style={StyleSheet.absoluteFillObject}
    />
  )
}

else if(buttonState === "normal"){
return(
<View style={styles.container}>
<Image source={require("../assets/img.jpg")}
style={{width:200, height: 200}}/>
    <Text style={styles.displayText}>{
      hasCameraPermissions===true ? this.state.scannedData: "REQUEST CAMERA PERMISSION"
    }
    </Text>
    <TouchableOpacity
    onPress={this.getCameraPermissions}
    style={styles.displayText}>
      <Text style={styles.scanButton} >SCAN QR CODE</Text>
    </TouchableOpacity>
</View>
)
}
}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 15,
      textAlign: 'center',
      marginTop: 10
    },
    inputView:{
      flexDirection: 'row',
      margin: 20
    },
    inputBox:{
      width: 200,
      height: 40,
      borderWidth: 1.5,
      borderRightWidth: 0,
      fontSize: 20
    },
    scanButton:{

      backgroundColor: '#66BB6A',
      width: 120,
      borderRadius:3,
      borderLeftWidth: 0
      
    }
  });