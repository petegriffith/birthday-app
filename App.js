import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Header, Avatar } from "react-native-elements";

/* import Header from "./src/components/Header"; */
import ProfileModal from "./src/modals/ProfileModal";
import Login from "./src/views/Login";
import QuestionsDash from "./src/views/QuestionsDash";
import Colors from "./src/constants/Colors";

// this variable is outside App only because of an example I found in the apollo docs
const client = new ApolloClient({
  uri: `https://f53c304ac57c.ngrok.io/graphql`, //should set this to a variable?
  cache: new InMemoryCache(),
});

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  const profileViewHandler = () => {
    console.log("opening profile");
    setProfileModalVisible(true);
  };

  const mainViewHandler = () => {
    if (isLoggedIn) {
      return <QuestionsDash />;
    } else {
      return <Login logInUser={setIsLoggedIn} setUser={setUser} />;
    }
  };

  return (
    <ApolloProvider client={client}>
      <View style={styles.screen}>
        <Header
          containerStyle={styles.header}
          leftComponent={{ icon: "menu" }}
          centerComponent={{ text: "BIRTHDAY APP" }}
          rightComponent={
            <Avatar rounded title="MD" onPress={profileViewHandler} />
          }
        />
        <ProfileModal
          modalVisible={profileModalVisible}
          username={user}
          setModalVisible={setProfileModalVisible}
        />
        {mainViewHandler()}
        <StatusBar style="auto" />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    width: "100%",
    height: 90,
    padding: 30,
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
