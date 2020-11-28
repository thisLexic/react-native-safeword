import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class HomeScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: []
      };
    }


  static navigationOptions = {
    title: "Home"
  };


    componentDidMount() {
        const { navigation } = this.props;
        this.getAllDetails();
        // navigation.addListener("willFocus", () => {
        //   this.getAllDetails();
        // });
      }

      getAllDetails = async () => {
        const keys = await AsyncStorage.getAllKeys()
        console.log(keys)
      };


      
  render() {
    return (
      <View style={styles.container}>
            <Text>Home</Text>
          <Text></Text>
          <TouchableOpacity
          style={styles.floatButton}
          onPress={() => {
            this.props.navigation.navigate("AddScreen");
          }}
          >
            <Entypo name="plus" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff"
    },
    listItem: {
      flexDirection: "row",
      padding: 20
    },
    iconContainer: {
      width: 50,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#B83227",
      borderRadius: 100
    },
    contactIcon: {
      fontSize: 28,
      color: "#fff"
    },
    infoContainer: {
      flexDirection: "column"
    },
    infoText: {
      fontSize: 16,
      fontWeight: "400",
      paddingLeft: 10,
      paddingTop: 2
    },
    floatButton: {
      borderWidth: 1,
      borderColor: "rgba(0,0,0,0.2)",
      alignItems: "center",
      justifyContent: "center",
      width: 60,
      position: "absolute",
      bottom: 10,
      right: 10,
      height: 60,
      backgroundColor: "#487EB0",
      borderRadius: 100
    }
  });