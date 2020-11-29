import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Form, Item, Input, Label, Button } from "native-base";

export default class EditScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      website: "",
      account: "",
      key: ""
    };
  }


  static navigationOptions = {
    title: "Edit"
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", () => {
      var key = this.props.navigation.getParam("key", "");
      this.getDetails(key);
    });
  }

  getDetails = async key => {
    let detailsJson = await AsyncStorage.getItem(key)
    let details = JSON.parse(detailsJson)
    details["key"] = key
    this.setState(details)
  };

  updateDetails = async () => {
    if (
      this.state.website !== "" &&
      this.state.account !== ""
    ) {
      var contact = {
        fname: this.state.fname,
        lname: this.state.lname,
        phone: this.state.phone,
        email: this.state.email,
        address: this.state.address
      };
      const key = this.state.key
      await AsyncStorage.mergeItem(key, JSON.stringify(contact))
        .then(() => {
          this.props.navigation.goBack();
        })
        .catch(eror => {
          console.log(error);
        });
    } else{
      Alert.alert("All fields are required!");
    }
  }

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
                value={this.state.website}
              />
            </Item>
            <Item style={styles.inputItem}>
              <Label>Account:</Label>
              <Input
                autoCorrect={true}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={account => this.setState({ account })}
                value={this.state.account}
              />
            </Item>
          </Form>
          <Button
            full
            rounded
            style={styles.button}
            onPress={() => {
              this.updateDetails(this.state.key);
            }}
          >
            <Text style={styles.buttonText}>Update</Text>
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
    backgroundColor: "#74B9FF",
    marginTop: 20,
    marginHorizontal: 40
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  }
});
