import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
  Alert
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, CardItem } from "native-base";
import { Entypo } from "@expo/vector-icons";

export default class ReadScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        website: "Sample Website",
        account: "Sample Account"
      };
    }
  
    static navigationOptions = {
      title: "Website"
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contactIconContainer}>
          <Text style={styles.contactIcon}>
            {this.state.website[0].toUpperCase()}
          </Text>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>
              {this.state.website}
            </Text>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <Card style={styles.card}>
            <CardItem>
              <Text style={styles.infoText}>Account: {this.state.account}</Text>
            </CardItem>
          </Card>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff"
    },
    contactIconContainer: {
      height: "40%",
      backgroundColor: "#74B9FF",
      alignItems: "center",
      justifyContent: "center"
    },
    contactIcon: {
      fontSize: 100,
      fontWeight: "bold",
      color: "#fff"
    },
    nameContainer: {
      width: "100%",
      height: 70,
      padding: 10,
      // backgroundColor: "rgba(255,255,255,0.5)",
      justifyContent: "center",
      position: "absolute",
      bottom: 0
    },
    name: {
      fontSize: 30,
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
    }
  });
  