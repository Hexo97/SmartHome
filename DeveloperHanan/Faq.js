import React, { useState, useEffect, useContext } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import db from "../db";
import UserContext from "../UserContext";
import { Input } from "react-native-elements";
import FaqScreen from "./FaqScreen";
import { Button } from "react-native-elements";

export default function Faq() {
  const [faq, setFaq] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [id, setId] = useState("");

  const { user } = useContext(UserContext);

  useEffect(() => db.Faq.listenAll(setFaq), []);

  const create = async () => {
    if (user) {
      db.Faq.create({ question, answer, userid: user.id });
    } else {
      db.Faq.create({ question, answer, userid: "Anonymous" });
    }

    setId("");
    setQuestion("");
    setAnswer("");
  };

  const edit = (faq) => {
    setId(faq.id);
    setQuestion(faq.question);
    setAnswer(faq.answer);
  };

  const save = () => {
    db.Faq.update({ id, question, answer });
    setId("");
    setQuestion("");
    setAnswer("");
  };

  const remove = (id) => {
    db.Faq.remove(id);
  };

  const [validAdd, setValidAdd] = useState(false);

  useEffect(() => {
    const getData = () => {
      const validateAdd = () =>
        id.length === 0 && answer.length > 0 && setValidAdd(validateAdd());
    };
    getData();
  }, [id, question, answer]);

  const [validEdit, setValidEdit] = useState(false);

  useEffect(() => {
    const getData = () => {
      const validateEdit = () =>
        id.length > 0 &&
        answer.length > 0 &&
        question.length > 0 &&
        undefined !== db.Faq.findOne(id);

      setValidEdit(validateEdit());
    };
    getData();
  }, [id, question, answer]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FAQ Form</Text>
      <Input
        placeholder="Question"
        value={question}
        onChangeText={(value) => setQuestion(value)}
      />
      {user ? user.role === "Support" ? (
        <Input
          placeholder="Answer"
          value={answer}
          onChangeText={(value) => setAnswer(value)}
        />
      ):
         null
      : (
        <></>
      )}

      <Button
        onPress={create}
        title="Ask"
        type="outline"
        disabled={!(question.length > 10 && id.length === 0)}
      />

      { user ? user.role === "Support" ? (
        <Button
          onPress={save}
          title="Answer"
          disabled={!validEdit}
          type="outline"
        />
      ) :
        null
      : null}

      <View style={styles.container}>
        {faq.map((faq) =>
          faq.answer !== "" ? (
            <FaqScreen
              key={faq.id}
              userid={faq.userid}
              edit={edit}
              remove={remove}
              faq={faq}
              {...faq}
            />
          ) : user ? user.role === "Support" ? (
            <FaqScreen
              key={faq.id}
              userid={faq.userid}
              edit={edit}
              remove={remove}
              faq={faq}
              {...faq}
            />
          ) : null 
          : null
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEFBFB",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4DA8DA",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
    display: "flex",
    height: 30,
    width: 100,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
    shadowColor: "white",
    shadowOpacity: 0.4,
    padding: 5,
    margin: 5,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
