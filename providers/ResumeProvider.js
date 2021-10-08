import React, {useContext, useState, useEffect, useRef} from 'react';
import Realm from 'realm';
import {useAuth} from './AuthProvider';
import {Resume} from '../schemas';
import {ObjectId} from 'bson';

const ResumeContext = React.createContext(null);

const ResumeProvider = ({children}) => {
  const [resumes, setResume] = useState([]);
  const {user} = useAuth();
  // Use a Ref to store the realm rather than the state because it is not
  // directly rendered, so updating it should not trigger a re-render as using
  // state would.
  const realmRef = useRef(null);

  useEffect(() => {
    // Enables offline-first: opens a local realm immediately without waiting
    // for the download of a synchronized realm to be completed.
    if (!user) {
      return;
    }
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
      const syncResume = projectRealm.objects('Resume').sorted('name');
      let sortedResume = syncResume;
      setResume(sortedResume);
      sortedResume.addListener(() => {
        setResume(sortedResume);
      });
    });

    return () => {
      // cleanup function
      const projectRealm = realmRef.current;
      if (projectRealm) {
        projectRealm.close();
        realmRef.current = null;
        setResume([]);
      }
    };
  }, [user]);

  const createResume = newResumeFields => {
    const realm = realmRef.current;
    realm.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      realm.create(
        'Resume',
        new Resume({
          name: newResumeFields.newResumeName || 'New Resume',
          personalStatement: newResumeFields.newResumePersonalStatement,
          partition: `user=${user.id}`,
        }),
      );
      const syncResume = realm.objects('Resume').sorted('name');
      let sortedResume = syncResume;
      setResume(sortedResume);
    });
  };

  const findResume = resumeItem => {
    const realm = realmRef.current;
    const resume = realm
      .objects('Resume')
      .filtered(`_id = oid(${resumeItem._id})`);
    return resume;
  };

  const updateResume = (resumeArg, resumeFields) => {
    const realm = realmRef.current;
    realm.write(() => {
      realm.create(
        'Resume',
        {
          _id: ObjectId(resumeArg[0]._id),
          name: resumeFields.name,
          personalStatement: resumeFields.personalStatement,
          partition: `user=${user.id}`,
        },
        'modified',
      );
    });
  };

  // Define the function for deleting a task.
  const deleteResume = cl => {
    const realm = realmRef.current;
    realm.write(() => {
      realm.delete(cl);
      setResume(realm.objects('Resume').sorted('name'));
    });
  };

  // Render the children within the TaskContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useTasks hook.
  return (
    <ResumeContext.Provider
      value={{
        createResume,
        findResume,
        updateResume,
        deleteResume,
        resumes,
      }}>
      {children}
    </ResumeContext.Provider>
  );
};

// The useTasks hook can be used by any descendant of the TasksProvider. It
// provides the tasks of the TasksProvider's project and various functions to
// create, update, and delete the tasks in that project.
const useResume = () => {
  const resumes = useContext(ResumeContext);
  if (resumes == null) {
    throw new Error('resume() called outside of a resumeProvider?'); // an alert is not placed because this is an error for the developer not the user
  }
  return resumes;
};

export {ResumeProvider, useResume};
