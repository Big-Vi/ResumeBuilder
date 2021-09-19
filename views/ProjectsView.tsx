import React from "react";
import { View } from "react-native";
import { useAuth } from "../providers/AuthProvider";
import { ListItem } from "react-native-elements";
import { RootTabScreenProps } from '../types';

export function ProjectsView({ navigation }: RootTabScreenProps<'Projects'>) {
  const { projectData } = useAuth();

  // the onClickProject navigates to the Task List with the project name
  // and project partition value
  const onClickProject = async (project: any) => {
    navigation.navigate("TaskList", {
      user: project.name,
      projectPartition: project.partition,
    });
  };

  return (
    <View>
      {projectData.map((project: any) => (
        <View key={project.name}>
          <ListItem
            onPress={() => onClickProject(project)}
            bottomDivider
            key={project.name}
          >
            <ListItem.Content>
              <ListItem.Title>
                {project.name}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </View>
      ))}
    </View>
  );
}
