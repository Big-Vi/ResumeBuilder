import React, { useState } from "react";
import { Overlay, Input, Button } from "react-native-elements";
import styles from "../../stylesheet";

// The AddTask is a button for adding tasks. When the button is pressed, an
// overlay shows up to request user input for the new task name. When the
// "Create" button on the overlay is pressed, the overlay closes and the new
// task is created in the realm.
export function AddCoverLetter({ createCoverLetter }) {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [newCoverLetterName, setNewCoverLetterName] = useState("");

  return (
    <>
      <Overlay
        isVisible={overlayVisible}
        overlayStyle={{ width: "90%" }}
        onBackdropPress={() => setOverlayVisible(false)}
      >
        <>
          <Input
            placeholder="New Cvoer Letter"
            onChangeText={(text) => setNewCoverLetterName(text)}
            autoFocus={true}
          />
          <Button
            title="Create"
            onPress={() => {
              setOverlayVisible(false);
              createCoverLetter(newCoverLetterName);
            }}
          />
        </>
      </Overlay>
      <Button
        type="clear"
        titleStyle={styles.plusButton}
        title="&#x2b;"
        onPress={() => {
          setOverlayVisible(true);
        }}
      />
    </>
  );
}
