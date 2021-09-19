import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { CoverLetter } from "../schemas";
import { useAuth } from "./AuthProvider";

const CoverLetterContext = React.createContext(null);

const CoverLetterProvider = ({ children }) => {
  const [coverLetters, setCoverLetter] = useState([]);
  const { user } = useAuth();

  // Use a Ref to store the realm rather than the state because it is not
  // directly rendered, so updating it should not trigger a re-render as using
  // state would.
  const realmRef = useRef(null);

  useEffect(() => {
    // Enables offline-first: opens a local realm immediately without waiting 
    // for the download of a synchronized realm to be completed.
    const OpenRealmBehaviorConfiguration = {
      type: 'openImmediately',
    };
    const config = {
      schema: [CoverLetter.schema],
      sync: {
        user: user,
        partitionValue: `user=${user.id}`,
        newRealmFileBehavior: OpenRealmBehaviorConfiguration,
        existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
      },
    };
    // open a realm for this particular project
    Realm.open(config).then((projectRealm) => {
      realmRef.current = projectRealm;

      const syncCoverLetter = projectRealm.objects("CoverLetter");
      let sortedCoverLetter = syncCoverLetter.sorted("name");
      setCoverLetter([...sortedCoverLetter]);
      sortedCoverLetter.addListener(() => {
        setCoverLetter([...sortedCoverLetter]);
      });
    });

    return () => {
      // cleanup function
      const projectRealm = realmRef.current;
      if (projectRealm) {
        projectRealm.close();
        realmRef.current = null;
        setCoverLetter([]);
      }
    };
  }, [user]);

  const createCoverLetter = (newCoverLetterName) => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectRealm.create(
        "CoverLetter",
        new CoverLetter({
          name: newCoverLetterName || "New CoverLetter",
          partition: user.id,
        })
      );
    });
  };

  const setCoverLetterStatus = (cl, status) => {
    // One advantage of centralizing the realm functionality in this provider is
    // that we can check to make sure a valid status was passed in here.
    if (
      ![
        CoverLetter.STATUS_OPEN,
        CoverLetter.STATUS_IN_PROGRESS,
        CoverLetter.STATUS_COMPLETE,
      ].includes(status)
    ) {
      throw new Error(`Invalid status: ${status}`);
    }
    const projectRealm = realmRef.current;

    projectRealm.write(() => {
      cl.status = status;
    });
  };

  // Define the function for deleting a task.
  const deleteCoverLetter = (cl) => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      projectRealm.delete(cl);
      setCoverLetter([...projectRealm.objects("CoverLetter").sorted("name")]);
    });
  };

  // Render the children within the TaskContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useTasks hook.
  return (
    <CoverLetterContext.Provider
      value={{
        createCoverLetter,
        deleteCoverLetter,
        setCoverLetterStatus,
        coverLetters,
      }}
    >
      {children}
    </CoverLetterContext.Provider>
  );
};

// The useTasks hook can be used by any descendant of the TasksProvider. It
// provides the tasks of the TasksProvider's project and various functions to
// create, update, and delete the tasks in that project.
const useCoverLetters = () => {
  const coverLetter = useContext(CoverLetterContext);
  if (coverLetter == null) {
    throw new Error("useCoverLetters() called outside of a CoverLetterProvider?"); // an alert is not placed because this is an error for the developer not the user
  }
  return coverLetter;
};

export { CoverLetterProvider, useCoverLetters };
