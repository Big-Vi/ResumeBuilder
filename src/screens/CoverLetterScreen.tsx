import React, { useState, useEffect } from "react";

import { View, Button, Text, Pressable, UIManager } from "react-native";
import styles from "../../stylesheet";
import { RootTabScreenProps } from '../../types';

import { Overlay } from "react-native-elements";

import { useCoverLetters } from "@providers/CoverLetterProvider";
import { CoverLetterItem } from "@components/CoverLetterItem";
import { AddCoverLetter } from "@components/AddCoverLetter";
import { EditCoverLetter } from "@components/EditCoverLetter";

export function CoverLetterScreen({ navigation }: RootTabScreenProps<'CoverLetter'>) {
  const [state, setState] = useState(false)
  const [clickedCL, setClickedCL] = useState([])
  const { coverLetters, createCoverLetter, findCoverLetter, updateCoverLetter } = useCoverLetters();
  useEffect(() => {
    navigation.setOptions({
      headerRight: function Header() {
        return <AddCoverLetter createCoverLetter={createCoverLetter} modalVisibleState={false} setParentState={setParentState} />; 
      },
      title: `Cover Letter`,
    });
  }, []);

  const editCoverLetterItem = (id) => {
    const CL = findCoverLetter(id[1])
    setClickedCL(CL)
    setState(true)
  }

  const setParentState = () => {
    setState(false)
  }

  return (
    <View>
      {(state && clickedCL) ? 
        <EditCoverLetter updateCoverLetter={updateCoverLetter} modalVisibleState={true} setParentState={setParentState} clickedCL={clickedCL}/>
        : 
        coverLetters.map((cl: any) =>
          cl ?  
            <CoverLetterItem key={`${cl._id}`} cl={cl} 
              editCoverLetterItem={editCoverLetterItem}
            /> 
          : null
        )
      }
    </View>
  );
}
