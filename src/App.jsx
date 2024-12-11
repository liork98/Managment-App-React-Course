import { useState } from "react";

import ProjectSidebar from "./components/ProjectsSidebar.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectsSelected from "./components/NoProjectSelected.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
    const [projectState, setProjectState] = useState( {
        selectedProjectId: undefined,
        projects: [],
        tasks: [],
    });

    function handleAddTask(text) {
        setProjectState((prevState) => {
            const tasktId = Math.random();
            const newTask = {
                text: text,
                projectId: prevState.selectedProjectId,
                id: tasktId,
            };

            return {
                ...prevState,
                tasks: [newTask, ...prevState.tasks],
            };
        });
    }

    function handleDeleteTask(id) {
        setProjectState((prevState) => {
            return {
                ...prevState,
                tasks: prevState.tasks.filter((task) => task.id !== id),
            };
        });
    }

    function handleSelectProject(projectId) {
        setProjectState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: projectId,
            }
        });
    }

    function handleStartAddProject() {
        setProjectState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: null,
            }
        });
    }

    function handleCancelAddProject() {
        setProjectState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: undefined,
            }
        });
    }

    function handleAddProject(projectData) {
        setProjectState((prevState) => {
            const projectId = Math.random();
            const newProject = {
                ...projectData,
                id: projectId,
            };

            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: [...prevState.projects, newProject]
            };
        });
    }

    function handleDeleteProject() {
        setProjectState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId),
            };
        });
    }

    const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId);
    let content = <SelectedProject
    project={selectedProject}
    onDelete={handleDeleteProject}
    onAddTask={handleAddTask}
    onDeleteTask={handleDeleteTask}
    tasks={projectState.tasks}
    />;

    if (projectState.selectedProjectId === null) {
        content = <NewProject
            onAdd={handleAddProject}
            onCancel={handleCancelAddProject}/>
    }
    else if (projectState.selectedProjectId === undefined) {
        content = <NoProjectsSelected
            onStartAddProject={handleStartAddProject}
        />
    }

  return (
    <main
    className="h-screen my-8 flex gap-8">
        <ProjectSidebar
            onSelectProject={handleSelectProject}
            projects={projectState.projects}
            onStartAddProject={handleStartAddProject}
            selectedProjectId={projectState.selectedProjectId}
        />
        {content}
    </main>
  );
}

export default App;
