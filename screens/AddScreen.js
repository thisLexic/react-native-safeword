import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Keyboard,
    Alert,
    TouchableWithoutFeedback
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Form, Item, Input, Label, Button } from "native-base";

export default class AddScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        website: "",
        account: ""
      };
    }
  
    static navigationOptions = {
      title: "Add"
    };
  
    saveDetails = async () => {
      if (
        this.state.website !== "" &&
        this.state.account !== ""
      ) {
        var details = {
          website: this.state.website,
          account: this.state.account
        };
  
        await AsyncStorage.setItem(Date.now().toString(), JSON.stringify(details))
          .then(() => {
            this.props.navigation.goBack();
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        Alert.alert("All fields are required!");
      }
    };


  render() {
    return (
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
            <View style={styles.container}>
                <Form>
                    <Item style={styles.inputItem}>
                        <Label>Website:</Label>
                        <Input
                            autoCorrect={true}
                            autoCapitalize="none"
                            keyboardType="default"
                            onChangeText={website => this.setState({ website })}
                        />
                    </Item>
                    <Item style={styles.inputItem}>
                        <Label>Account:</Label>
                        <Input
                            autoCorrect={true}
                            autoCapitalize="none"
                            keyboardType="default"
                            onChangeText={account => this.setState({ account })}
                        />
                    </Item>
                </Form>
                <Button
                    style={styles.button}
                    full
                    rounded
                    onPress={() => {
                    this.saveDetails();
                    }}
                >
                    <Text style={styles.buttonText}>Save</Text>
                </Button>
            </View>
        </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      margin: 10
    },
    inputItem: {
      margin: 10
    },
    button: {
      backgroundColor: "#487EB0",
      marginTop: 20,
      marginHorizontal: 40
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold"
    },
    empty: {
      height: 500,
      backgroundColor: "#FFF"
    }
  });
  