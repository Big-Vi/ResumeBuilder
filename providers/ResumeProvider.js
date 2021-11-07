import React, {useContext, useState, useEffect, useRef} from 'react';
import Realm from 'realm';
import {useAuth} from './AuthProvider';
import {Resume} from '../schemas';
import {ObjectId} from 'bson';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {TwoPage} from '../src/components/Resume/Templates/TwoPage';

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

  const createPDF = async (ID, newResumeFields) => {
    let options = {
      html: returnResumeHTML(newResumeFields),
      fileName: `${newResumeFields.resumeTitle}-${ID}`,
      directory: 'Documents',
    };
    console.log(await RNHTMLtoPDF.convert(options));
    return await RNHTMLtoPDF.convert(options);
  };

  const createResume = newResumeFields => {
    // console.log(newResumeFields);
    const realm = realmRef.current;
    let ID = new ObjectId();
    createPDF(ID, newResumeFields).then(function (data) {
      let filePath = data.filePath;
      realm.write(() => {
        // Create a new task in the same partition -- that is, in the same project.
        realm.create(
          'Resume',
          new Resume({
            id: ID,
            resumeTitle: newResumeFields.resumeTitle,
            name: newResumeFields.name,
            personalStatement: newResumeFields.personalStatement,
            email: newResumeFields.email,
            mobile: newResumeFields.mobile,
            visaStatus: newResumeFields.visaStatus,
            order: newResumeFields.order,
            location: newResumeFields.location,
            partition: `user=${user.id}`,
            filePath: filePath,
            experiences: newResumeFields.experiences,
            qualifications: newResumeFields.qualifications,
            skills: newResumeFields.skills,
          }),
        );
        const syncResume = realm.objects('Resume').sorted('name');
        let sortedResume = syncResume;
        setResume(sortedResume);
      });
    });
  };

  const findResume = resumeItem => {
    // console.log(resumeItem);
    const realm = realmRef.current;
    const resume = realm
      .objects('Resume')
      .filtered(`_id = oid(${resumeItem._id[1]})`);
    return resume;
  };

  const returnResumeHTML = resumeItem => {
    return TwoPage(resumeItem);
  };

  const updateFilePath = (resumeArg, resumeFields) => {
    const realm = realmRef.current;
    createPDF(ObjectId(resumeArg[0]._id[1]), resumeFields).then(function (
      data,
    ) {
      let filePath = data.filePath;
      console.log('kkk');
      realm.write(() => {
        realm.create(
          'Resume',
          {
            _id: ObjectId(resumeArg[0]._id[1]),
            resumeTitle: resumeFields.resumeTitle,
            filePath: filePath,
          },
          'modified',
        );
      });
    });
  };

  const updateResume = (resumeArg, resumeFields) => {
    // console.log(resumeFields);
    const realm = realmRef.current;
    createPDF(ObjectId(resumeArg[0]._id[1]), resumeFields);
    realm.write(() => {
      realm.create(
        'Resume',
        {
          _id: ObjectId(resumeArg[0]._id[1]),
          resumeTitle: resumeFields.resumeTitle,
          name: resumeFields.name,
          personalStatement: resumeFields.personalStatement,
          email: resumeFields.email,
          mobile: resumeFields.mobile,
          visaStatus: resumeFields.visaStatus,
          order: resumeFields.order,
          location: resumeFields.location,
          partition: `user=${user.id}`,
          experiences: Object.values(resumeFields.experiences),
          qualifications: Object.values(resumeFields.qualifications),
          skills: resumeFields.skills,
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
      const syncResume = realm.objects('Resume').sorted('name');
      let sortedResume = syncResume;
      setResume(sortedResume);
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
        updateFilePath,
        deleteResume,
        resumes,
        returnResumeHTML,
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
