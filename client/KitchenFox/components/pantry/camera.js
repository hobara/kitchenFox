import React, { Component } from 'react';
import { StackNavigator, Alert, StyleSheet } from 'react-native';
import Camera from "react-native-camera";

import {
  Container,
  Header,
  Title,
  InputGroup,
  Input,
  Button,
  Spinner,
  Icon,
  View,
  Text,
  Navigator,
} from 'native-base';

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   flexDirection: 'column',
  // },
  container: {
    flex: 1,
    justifyContent: "center",
    // width:300,
    // height:5,
    // alignItems: "center",
    backgroundColor: "transparent",
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: 'white',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

class BarCodeCamera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCamera: true,
      cameraType: Camera.constants.Type.back
    };
    this._onBarCodeRead = this._onBarCodeRead.bind(this);
  }

  // static navigationOptions = {
  //   title: 'Scan the Item',
  // };

  render() {
    if (this.state.showCamera) {
        return (
          <View style={styles.container}>
          <Text>
            Scan the barcode now!
          </Text>
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}
            orientation={Camera.constants.Orientation.portrait}
            barCodeTypes={['org.gs1.UPC-E']}
            onBarCodeRead={this._onBarCodeRead}>
          </Camera>
          </View>
        );
    } else {
        return (
          <View>
            <Text>
              None
            </Text>
          </View>
        );
    }
  }

  // takePicture() {
  // const options = {};
  // //options.location = ...
  // this.camera.capture({metadata: options})
  //   .then((data) => console.log(data))
  //   .catch(err => console.error(err));
  // }

  _onBarCodeRead(e) {
    this.setState({showCamera: false});
    console.warn("here");
    Alert.alert(
        "Barcode Found!",
        "Type: " + e.type + "\nData: " + e.data
    );
  }

}

export default BarCodeCamera;