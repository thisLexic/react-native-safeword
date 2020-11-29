import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from "react-native";
import { Card } from "native-base";
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
        navigation.addListener("willFocus", () => {
          this.getAllDetails();
        });
      }

      getAllDetails = async () => {
        const keys = await AsyncStorage.getAllKeys()
        const details = await AsyncStorage.multiGet(keys)
        details.sort(function(a, b) {
            if (JSON.parse(a[1]).website.toUpperCase() < JSON.parse(b[1]).website.toUpperCase()) {
              return -1;
            }
            if (JSON.parse(a[1]).website.toUpperCase() > JSON.parse(b[1]).website.toUpperCase()) {
              return 1;
            }
            return 0;
        })
        this.setState({ data: details })
      };


      
  render() {
    return (
      <View style={styles.container}>
      <FlatList
        data={this.state.data}
        renderItem={({ item }) => {
          details = JSON.parse(item[1]);
          return (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("ReadScreen", {
                  key: item[0]
                });                  
              }}
            >
              <Card style={styles.listItem}>
                <View style={styles.iconContainer}>
                  <Text style={styles.contactIcon}>
                    {details.website[0].toUpperCase()}
                  </Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>
                    {details.website}
                  </Text>
                  <Text style={styles.infoText}>{details.account}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => item[0]}
      />          
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
      backgroundColor: "#74B9FF",
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
      borderColor: "rgba(0,0,0,0.2)",
      alignItems: "center",
      justifyContent: "center",
      width: 60,
      position: "absolute",
      bottom: 10,
      right: 10,
      height: 60,
      backgroundColor: "#74B9FF",
      borderRadius: 100
    }
  });