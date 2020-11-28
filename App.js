//import screens
import HomeScreen from "./screens/HomeScreen";
import AddScreen from "./screens/AddScreen";
import EditScreen from "./screens/EditScreen";
import ReadScreen from "./screens/ReadScreen";

//import react navigation
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from 'react-navigation';

const MainNavigator = createStackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    AddScreen: { screen: AddScreen },
    ReadScreen: { screen: ReadScreen },
    EditScreen: { screen: EditScreen }
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#487EB0"
      },
      headerTitleStyle: {
        color: "#fff"
      }
    }
  }
);

const App = createAppContainer(MainNavigator);
export default App;
