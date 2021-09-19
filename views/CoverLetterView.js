import React, { useState, useEffect } from "react";

import { View, Button } from "react-native";
import styles from "../stylesheet";

import { Overlay } from "react-native-elements";

import { useCoverLetters } from "../providers/CoverLetterProvider";
import { CoverLetterItem } from "../src/components/CoverLetterItem";
import { AddCoverLetter } from "../src/components/AddCoverLetter";

export function CoverLetterView({ navigation }) {

  const { coverLetters, createCoverLetter } = useCoverLetters();
  useEffect(() => {
    navigation.setOptions({
      headerRight: function Header() {
        return <AddCoverLetter createCoverLetter={createCoverLetter} />;
      },
      title: `Cover Letter`,
    });
  }, []);

  return (
    <View>
      {coverLetters.map((cl) =>
        cl ? <CoverLetterItem key={`${cl._id}`} cl={cl} /> : null
      )}
    </View>
  );
}
