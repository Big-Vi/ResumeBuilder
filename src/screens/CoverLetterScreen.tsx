import React, { useState, useEffect } from "react";

import { View, Button, Text, Pressable, UIManager } from "react-native";
import styles from "../../stylesheet";
import { RootTabScreenProps } from '../../types';

import { Overlay } from "react-native-elements";

import { useCoverLetters } from "../../providers/CoverLetterProvider";
import { CoverLetterItem } from "../components/CoverLetterItem";
import { AddCoverLetter } from "../components/AddCoverLetter";
import { EditCoverLetter } from "../components/EditCoverLetter";
import { PreviewCoverLetter } from "../components/PreviewCoverLetter";

import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from "redux";
import { actionCreators, State } from '../state'

export function CoverLetterScreen({ navigation }: RootTabScreenProps<'CoverLetter'>) {
  const { coverLetters, createCoverLetter, findCoverLetter, updateCoverLetter } = useCoverLetters();

  const dispatch = useDispatch()
  const { setEditState, setPreviewState, setClickedCL } = bindActionCreators(actionCreators, dispatch)
  const editState = useSelector((state: State) => state.userReducer.editState)
  const previewState = useSelector((state: State) => state.userReducer.previewState)
  const clickedCL = useSelector((state: State) => state.userReducer.clickedCL)

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
    setEditState(true)
  }

  const previewCoverLetterItem = (id) => {
    const CL = findCoverLetter(id[1])
    console.log(id)
    setClickedCL(CL)
    setPreviewState(true)
  }

  const setParentState = () => {
    setEditState(false)
    setPreviewState(false)
  }

  return (
    <View>
      {(editState && clickedCL) ? 
        <EditCoverLetter updateCoverLetter={updateCoverLetter} modalVisibleState={true} setParentState={setParentState} clickedCL={clickedCL}/>
        : (previewState && clickedCL) ?
        <PreviewCoverLetter modalVisibleState={true} setParentState={setParentState} clickedCL={clickedCL}/>
        :
        coverLetters.map((cl: any) =>
          cl ?  
            <CoverLetterItem key={`${cl._id}`} cl={cl} 
              editCoverLetterItem={editCoverLetterItem}
              previewCoverLetterItem={previewCoverLetterItem}
            /> 
          : null
        )
      }
    </View>
  );
}
