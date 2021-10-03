import React, {useContext, useState, useEffect, useRef} from 'react';
import Realm from 'realm';
import {useAuth} from './AuthProvider';
import {CoverLetter} from '../schemas';

const CoverLetterContext = React.createContext(null);

const CoverLetterProvider = ({children}) => {
  const [coverLetters, setCoverLetter] = useState([]);
  const {user} = useAuth();

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
      sync: {
        user: user,
        partitionValue: `user=${user.id}`,
        newRealmFileBehavior: OpenRealmBehaviorConfiguration,
        existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
      },
    };
    // open a realm for this particular project
    Realm.open(config).then(projectRealm => {
      realmRef.current = projectRealm;
      const syncCoverLetter = projectRealm
        .objects('CoverLetter')
        .sorted('name');
      let sortedCoverLetter = syncCoverLetter;
      setCoverLetter(sortedCoverLetter);
      sortedCoverLetter.addListener(() => {
        setCoverLetter(sortedCoverLetter);
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

  const createCoverLetter = newCoverLetterFields => {
    const realm = realmRef.current;
    realm.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      realm.create(
        'CoverLetter',
        new CoverLetter({
          name: newCoverLetterFields.newCoverLetterName || 'New CoverLetter',
          salutation: newCoverLetterFields.newCoverLetterSalutation,
          intro: newCoverLetterFields.newCoverLetterIntro,
          body: newCoverLetterFields.newCoverLetterBody,
          closing: newCoverLetterFields.newCoverLetterClosing,
          signature: newCoverLetterFields.newCoverLetterSignature,
          partition: `user=${user.id}`,
        }),
      );
      const syncCoverLetter = realm.objects('CoverLetter').sorted('name');
      let sortedCoverLetter = syncCoverLetter;
      setCoverLetter(sortedCoverLetter);
    });
  };

  const findCoverLetter = id => {
    const realm = realmRef.current;
    const coverLetter = realm
      .objects('CoverLetter')
      .filtered(`_id = oid(${id})`);
    return coverLetter;
  };

  const updateCoverLetter = (CoverLetterArg, coverLetterFields) => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      console.log(CoverLetterArg[0]);
      CoverLetterArg[0].name = coverLetterFields.newCoverLetterName;
      CoverLetterArg[0].salutation = coverLetterFields.newCoverLetterSalutation;
      CoverLetterArg[0].intro = coverLetterFields.newCoverLetterIntro;
      CoverLetterArg[0].body = coverLetterFields.newCoverLetterBody;
      CoverLetterArg[0].closing = coverLetterFields.newCoverLetterClosing;
      CoverLetterArg[0].signature = coverLetterFields.newCoverLetterSignature;
    });
  };

  // Define the function for deleting a task.
  const deleteCoverLetter = cl => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      projectRealm.delete(cl);
      setCoverLetter(projectRealm.objects('CoverLetter').sorted('name'));
    });
  };

  // Render the children within the TaskContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useTasks hook.
  return (
    <CoverLetterContext.Provider
      value={{
        createCoverLetter,
        findCoverLetter,
        updateCoverLetter,
        deleteCoverLetter,
        coverLetters,
      }}>
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
    throw new Error(
      'useCoverLetters() called outside of a CoverLetterProvider?',
    ); // an alert is not placed because this is an error for the developer not the user
  }
  return coverLetter;
};

export {CoverLetterProvider, useCoverLetters};
