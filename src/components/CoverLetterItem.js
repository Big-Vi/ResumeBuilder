import React, { useState } from "react";
import { ListItem, Text } from "react-native-elements";
import { useCoverLetters } from "@providers/CoverLetterProvider";
import { CoverLetter } from "../../schemas";
import { TouchableOpacity } from "react-native";
import { ActionSheet } from "@components/ActionSheet";

import styles from "../../stylesheet";

export function CoverLetterItem({ cl, editCoverLetterItem, previewCoverLetterItem }) {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const { deleteCoverLetter } = useCoverLetters();
  const actions = [
    {
      title: "Delete",
      action: () => {
        deleteCoverLetter(cl);
      },
    },
    {
      title: "Edit",
      action: () => {
        editCoverLetterItem(cl._id);
      },
    },
    {
      title: "Preview",
      action: () => {
        previewCoverLetterItem(cl._id);
      },
    },
  ];
  
  return (
    <>
    <ActionSheet
        visible={actionSheetVisible}
        closeOverlay={() => {setActionSheetVisible(false);}}
        actions={actions}
      />
      <ListItem 
        key={cl._id} 
        onPress={() => {
          setActionSheetVisible(true);
        }}
        bottomDivider>
        <ListItem.Content>
          <ListItem.Title>
            {cl.name}
            </ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </>
  );
}
