import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
  Clipboard
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, CardItem, Form, Item, Label, Input, Button } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { sha512 } from "js-sha512";
// var sha512 = require('js-sha512');

import { alphaNumericMap } from "../utils/alphaNumericMap";
// import Clipboard from '@react-native-community/clipboard';

export default class ReadScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        website: "Missing Website",
        account: "Missing Account",
        key: "Missing Key",
        safeword: ""
      };
    }
  
    static navigationOptions = {
      title: ""
    };

    componentDidMount() {
      const { navigation } = this.props;
      navigation.addListener("willFocus", () => {
        var key = this.props.navigation.getParam("key", "");
        this.getDetails(key);
      });
    }

    getDetails = async key => {
      details = await AsyncStorage.getItem(key)
      var details = JSON.parse(details);
      details["key"] = key;
      this.setState(details);
    };

    copyPassword = async () => {
      if (this.state.safeword.length >= 8){
        const password = await this.getPassword()
        Clipboard.setString(password);
        Alert.alert("Success!", `Your password has been copied to your clipboard`)
      } else {
        Alert.alert("Too short!", "Use a safeword that is at least 8 characters long")
      }
    }
    
    
    getPassword = async () => {
      const text = `${this.state.website} ${this.state.account} ${this.state.safeword}`
      const hashed1 = await sha512(text);
      const alphaNumeric1 = this.makeAlphaNumeric(hashed1)
      const hashed2 = await sha512(alphaNumeric1);
      const alphaNumeric2 = this.makeAlphaNumeric(hashed2)
      return alphaNumeric2
    }

    makeAlphaNumeric = hash => {
      hashArray = this.hashStringToArray(hash)
      hashStringPassword = this.hashArrayToAlphaNumeric(hashArray)
      return hashStringPassword
    }

    hashStringToArray = hash => {
      arrayHash = []
      twoCharHash = ""
      for (var i = 0; i <= hash.length; i++) {
        if (twoCharHash.length === 2) {
          arrayHash.push(twoCharHash)
          twoCharHash = hash[i]
        } else{
          twoCharHash += hash[i]
        }
      }
      return arrayHash
    }

    hashArrayToAlphaNumeric = hash => {
      let alphaNumericPassword = ""
      for (var i = 0; i < hashArray.length; i++) {
        alphaNumericPassword += alphaNumericMap[hashArray[i]]
      }
      return alphaNumericPassword.substr(20, 15)
    }

    editOrDelete = key => {
      Alert.alert("Delete or Edit?", "", [
        {
          text: "Delete",
          onPress: () => {
            Alert.alert("Are you sure?", "You are attempting to delete an account", [{
                text: "Delete",
                onPress: async () => {
                  await AsyncStorage.removeItem(key);
                  this.props.navigation.goBack();
                }
              },
              {
                text: "Cancel",
                onPress: () => {}
              }
              ]
            )
          }
        },
        {
          text: "Edit",
          onPress: () => {
            this.props.navigation.navigate("EditScreen", {
              key: this.state.key
            })
          }
        },
        {
          text: "Cancel",
          onPress: () => {}
        },
      ]);
    }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.websiteIconContainer}>
          <Text style={styles.websiteIcon}>
            {this.state.website[0].toUpperCase()}
          </Text>
          <View style={styles.websiteContainer}>
            <Text style={styles.website}>
              {this.state.website}
            </Text>
          </View>
          <View style={styles.accountContainer}>
            <Text style={styles.account}>
              {this.state.account}
            </Text>
          </View>
        </View>

        <Form>
          <Item style={styles.inputItem}>
            <Label>Safeword:</Label>
            <Input
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={safeword => this.setState({ safeword })}
              />
          </Item>
        </Form>
        <Button
            style={styles.button}
            full
            rounded
            onPress={() => {
            this.copyPassword();
            }}
        >
            <Text style={styles.buttonText}>Get Password</Text>
        </Button>
        <TouchableOpacity
          style={styles.floatButton}
          onPress={() => {
            this.editOrDelete(this.state.key);
          }}
          >
            <Entypo name="tools" size={30} color="#fff" />
        </TouchableOpacity>
        <View style={styles.empty}></View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff"
    },
    websiteIconContainer: {
      height: 225,
      backgroundColor: "#74B9FF",
      alignItems: "center",
      justifyContent: "center"
    },
    websiteIcon: {
      fontSize: 100,
      fontWeight: "bold",
      color: "#fff"
    },
    websiteContainer: {
      width: "100%",
      height: 70,
      padding: 10,
      // backgroundColor: "rgba(255,255,255,0.5)",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: 0
    },
    website: {
      fontSize: 30,
      color: "#FFF",
      fontWeight: "200"
    },
    accountContainer: {
      width: "100%",
      height: 70,
      padding: 10,
      // backgroundColor: "rgba(255,255,255,0.5)",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: 0
    },
    account: {
      fontSize: 20,
      color: "#FFF",
      fontWeight: "200"
    },
    infoText: {
      fontSize: 18,
      fontWeight: "300"
    },
    actionContainer: {
      flexDirection: "row"
    },
    actionButton: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    actionText: {
      color: "#B83227",
      fontWeight: "900"
    },
    cardContainer: {
      flexDirection: "column"
    },
    card: {
      paddingVertical: 15
    },
    inputItem: {
      margin: 10
    },
    empty: {
      height: 300,
      backgroundColor: "#FFF"
    },
    button: {
      backgroundColor: "#74B9FF",
      marginTop: 20,
      marginHorizontal: 40
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold"
    },
    floatButton: {
      borderColor: "rgba(0,0,0,0.2)",
      alignItems: "center",
      justifyContent: "center",
      width: 60,
      position: "absolute",
      top: 10,
      right: 10,
      height: 60,
      // backgroundColor: 'red',
      backgroundColor: "#74B9FF",
      borderRadius: 100
    }
  });
  