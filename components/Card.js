import React, { useState } from "react";
import { Pressable, Text, StyleSheet } from "react-native";

import Colors from "../constants/Colors";
import QuestionModal from "./QuestionModal";

const Card = (props) => {
  const [answer, setAnswer] = useState("this is not the answer");
  const [modalVisible, setModalVisible] = useState(false);

  const cardPress = () => {
    console.log("modal is visible");
    setModalVisible(true);
  };

  return (
    <Pressable style={styles.card} onPress={cardPress}>
      <Text>{props.question}</Text>
      <Text>{answer}</Text>
      <QuestionModal
        modalVisible={modalVisible}
        question={props.question}
        setModalVisible={setModalVisible}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalView: {
    backgroundColor: Colors.accent,
    alignItems: "center",
    justifyContent: "center",
    padding: 69,
  },
  modalText: {
    fontSize: 20,
  },
});
export default Card;