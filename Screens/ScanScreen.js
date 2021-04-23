import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
    const {buttonState} = this.state

    if(buttonState==="BookId"){
      this.setState({
        scanned: true,
        scannedBookId: data,
        buttonState: 'normal'
      });
    }
    else if(buttonState==="StudentId"){
      this.setState({
        scanned: true,
        scannedStudentId: data,
        buttonState: 'normal'
      });
    }
    
  }

render(){
    const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;
return(
<View style={styles.container}>
    <Text style={styles.displayText}>{
      hasCameraPermissions===true ? this.state.scannedData: "REQUEST CAMERA PERMISSION"
    }</Text>
    <TouchableOpacity
    onPress={this.getCameraPermissions}
    style={styles.displayText}>
      <Text style={styles.scanButton} >SCAN QR CODE</Text>
    </TouchableOpacity>
</View>
)
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
      


})
