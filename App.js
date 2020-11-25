import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      website: "",
      account: "",
      secret: "",
      password: ""
    };
  }

  setPassword = () => {
    var password = this.state.website + " " + this.state.account + " " + this.state.secret
    this.setState({ password });
  };

  render() {
    return (
      <View style={styles.wholeScreen}>
        <View style={styles.topScreen}>
          <Text style={styles.title}>Safepass</Text>
        </View>
        <View style={styles.appScreen}>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              selectionColor="#040627"
              placeholder="Enter your Website"
              value={this.state.website}
              onChangeText={website =>
                this.setState({
                  website
                })
              }
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              selectionColor="#040627"
              placeholder="Enter your Account"
              value={this.state.account}
              onChangeText={account =>
                this.setState({
                  account
                })
              }
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              selectionColor="#040627"
              placeholder="Enter your Secret"
              value={this.state.secret}
              onChangeText={secret =>
                this.setState({
                  secret
                })
              }
            />
          </View>
          <View style={styles.outputContainer}>
            <TouchableOpacity 
              style={styles.textOutputButtonContainer}
              onPress={() => this.setPassword()}
              >
              <Text style={styles.passwordButton}>Get Password</Text>
            </TouchableOpacity>
            <View style={styles.textOutputContainer}>
              <Text style={styles.textOutput}> {this.state.password} </Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomScreen}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wholeScreen: {
    flex: 1,
    flexDirection: "column"
  },
  topScreen: {
    flex: 1,
    width: "100%",
    backgroundColor: "#42BEEB",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  bottomScreen: {
    flex: 1,
    width: "100%",
    backgroundColor: "#42BEEB"
  },
  appScreen: {
    flex: 10,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  textInputContainer: {
    marginTop: "2%",
    backgroundColor: "#E4E6FC",
    width: "60%",
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "#040627",
    borderWidth: 3,
  },
  textInput: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    width: "90%",
    height: "90%",
  },
  outputContainer: {
    flexDirection: "row",
    marginTop: "2%",
    backgroundColor: "#E4E6FC",
    width: "60%",
    height: "15%",
    borderColor: "#040627",
    borderWidth: 3,
  },
  textOutputButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    backgroundColor: "#6872DE",
    justifyContent: "center",
    alignContent: "center",
  },
  passwordButton: {
    fontSize: 20
  },
  textOutputContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  textOutput: {
    fontSize: 20,
  }
});
