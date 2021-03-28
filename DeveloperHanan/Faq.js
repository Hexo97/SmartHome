import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import db from "../db";
import UserContext from "../UserContext";
import FaqScreen from "./FaqScreen";
import { Card } from "react-native-elements";

export default function Faq({ navigation }) {
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



      <View style={styles.navBar}>
        {/* <TouchableOpacity
          style={{ width: 50, height: 50 }}
          onPress={() => navigation.openDrawer()}
        >
          
          <Image
            source={require("../assets/images/icon2.png")}
            style={{ width: 60, height: 60 }}
          />
        </TouchableOpacity> */}
        <Text style={styles.headingText}>FAQ's</Text>
      </View>
      {/* 
      <Input
        placeholder="Question"
        value={question}
        onChangeText={(value) => setQuestion(value)}
      /> */}

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Question"
          placeholderTextColor="#12232E"
          value={question}
          onChangeText={(value) => setQuestion(value)}
        />
      </View>
      {user ? (
        user.role === "Support" ? (
          // <Input
          //   placeholder="Answer"
          //   value={answer}
          //   onChangeText={(value) => setAnswer(value)}
          // />
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Answer"
              placeholderTextColor="#12232E"
              value={answer}
              onChangeText={(value) => setAnswer(value)}
            />
          </View>
        ) : null
      ) : (
        <></>
      )}

      {/* <Button
        onPress={create}
        title="Ask"
        type="outline"
        disabled={!(question.length > 10 && id.length === 0)}
      /> */}

      <TouchableOpacity
        disabled={!(question.length > 10 && id.length === 0)}
        onPress={create}
        style={styles.loginBtn}
      >
        <Text style={styles.loginText}>Ask</Text>
      </TouchableOpacity>

      {user ? (
        user.role === "Support" ? (
          <TouchableOpacity
            disabled={!validEdit}
            onPress={save}
            style={styles.loginBtn}
          >
            <Text style={styles.loginText}>Answer</Text>
          </TouchableOpacity>
        ) : null
      ) : null}
      <View style={styles.container}>
        <Card>
          <Text style={styles.title1}>Questions:</Text>
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
            ) : user ? (
              user.role === "Support" ? (
                <FaqScreen
                  key={faq.id}
                  userid={faq.userid}
                  edit={edit}
                  remove={remove}
                  faq={faq}
                  {...faq}
                />
              ) : null
            ) : null
          )}
        </Card>
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
  title1: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4DA8DA",
  },
  loginText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "bold",
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
  loginBtn: {
    width: "35%",
    borderRadius: 10,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 25,
    marginBottom: 20,
    backgroundColor: "#007CC7",
  },
  inputView: {
    borderColor: "#4DA8DA",
    borderWidth: 2,
    borderRadius: 15,
    width: "80%",
    paddingTop: 0,
    height: 50,
    fontSize: 15,
    color: "#12232E",
    marginBottom: 20,
  },
  TextInput: {
    width: "80%",
    height: 50,
    flex: 1,
    fontSize: 15,
    padding: 10,
    color: "#12232E",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  navBar: {
    backgroundColor: "#007CC7",
    height: 60,
    paddingRight: 10,
    width: "100%",
    marginBottom: 10,
    flexDirection: "row",
  },
  headingText: {
    top: "0.5%",
    fontSize: 30,
    textAlign: "center",
    marginLeft: "39.8%",
    fontWeight: "bold",
  },
});
