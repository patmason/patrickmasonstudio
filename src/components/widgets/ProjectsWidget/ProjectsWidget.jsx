import React, { useState } from "react"
import cx from "classnames"

//components
import Card from "../../atoms/Card/Card"
import Projects from "../../molecules/Projects/Projects"
import Project from "../../molecules/Project/Project"

const ProjectsWidget = () => {
  const [selectedProject, setSelectedProject] = useState(false)
  const handleProjectSelect = project => {
    setSelectedProject(project)
  }
  return (
    <div
      className={cx("z-30", {
        "absolute bg-black/20 inset-0 flex justify-center items-center":
          selectedProject,
      })}
    >
      <Card layout noShadow={selectedProject}>
        {selectedProject && (
          <Project
            project={selectedProject}
            handleProjectSelect={handleProjectSelect}
          />
        )}
        {!selectedProject && (
          <Projects handleProjectSelect={handleProjectSelect} />
        )}
      </Card>
    </div>
  )
}

export default ProjectsWidget
