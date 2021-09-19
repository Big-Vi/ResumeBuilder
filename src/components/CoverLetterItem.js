import React, { useState } from "react";
import { ListItem, Text } from "react-native-elements";
import { useCoverLetters } from "../../providers/CoverLetterProvider";
import { ActionSheet } from "./ActionSheet";
import { CoverLetter } from "../../schemas";

import styles from "../../stylesheet";

export function CoverLetterItem({ cl }) {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  const { deleteCoverLetter, setCoverLetterStatus } = useCoverLetters();
  const actions = [
    {
      title: "Delete",
      action: () => {
        deleteCoverLetter(cl);
      },
    },
  ];

  // For each possible status other than the current status, make an action to
  // move the task into that status. Rather than creating a generic method to
  // avoid repetition, we split each status to separate each case in the code
  // below for demonstration purposes.
  if (cl.status !== "" && cl.status !== CoverLetter.STATUS_OPEN) {
    actions.push({
      title: "Mark Open",
      action: () => {
        setCoverLetterStatus(cl, CoverLetter.STATUS_OPEN);
      },
    });
  }
  if (cl.status !== CoverLetter.STATUS_IN_PROGRESS) {
    actions.push({
      title: "Mark In Progress",
      action: () => {
        setCoverLetterStatus(cl, CoverLetter.STATUS_IN_PROGRESS);
      },
    });
  }
  if (cl.status !== CoverLetter.STATUS_COMPLETE) {
    actions.push({
      title: "Mark Complete",
      action: () => {
        setCoverLetterStatus(cl, CoverLetter.STATUS_COMPLETE);
      },
    });
  }

  return (
    <>
      <ActionSheet
        visible={actionSheetVisible}
        closeOverlay={() => {
          if (cl.status) {
            setActionSheetVisible(false);
          }
        }}
        actions={actions}
      />
      <ListItem 
        key={cl.id} 
        onPress={() => {
          setActionSheetVisible(true);
        }}
        bottomDivider>
        <ListItem.Content>
          <ListItem.Title>
            {cl.name}
            </ListItem.Title>
        </ListItem.Content>
        {
          cl.status === CoverLetter.STATUS_COMPLETE ? (
            <Text>&#10004; {/* checkmark */}</Text>
          ) : cl.status === CoverLetter.STATUS_IN_PROGRESS ? (
            <Text>In Progress</Text>
          ) : null
        }
      </ListItem>
    </>
  );
}
