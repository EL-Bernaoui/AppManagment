import React, { useState } from "react";

import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectSideBar from "./components/ProjectSideBar.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleNewTask(text) {
    setProjectState((prvState) => {
      const taskId = Math.random();

      const newTask = {
        text: text,
        projectId: prvState.selectedProjectId,
        id: taskId,
      };

      return {
        ...prvState,
        tasks: [...projectState.tasks, newTask],
      };
    });
  }
  function handleDeletTask(id) {
    setProjectState((prvState) => {
      return {
        ...prvState,
        tasks: prvState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  function handleSelectProject(id) {
    setProjectState((prvState) => {
      return {
        ...prvState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectState((prvState) => {
      return {
        ...prvState,
        selectedProjectId: null,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectState((prvState) => {
      return {
        ...prvState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectState((prvState) => {
      const projectId = Math.random();

      const newProject = {
        ...projectData,
        id: projectId,
      };

      return {
        ...prvState,
        selectedProjectId: undefined,
        projects: [...projectState.projects, newProject],
      };
    });
  }

  function handleDeleteProject() {
    setProjectState((prvState) => {
      return {
        ...prvState,
        selectedProjectId: undefined,
        projects: prvState.projects.filter(
          (project) => project.id !== prvState.selectedProjectId
        ),
      };
    });
  }

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      change={handleNewTask}
      deleted={handleDeletTask}
      tasks={projectState.tasks}
    />
  );

  if (projectState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSideBar
        onStartAddProject={handleStartAddProject}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
