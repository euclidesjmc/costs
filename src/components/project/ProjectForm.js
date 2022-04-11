import { useState, useEffect } from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

import styles from './ProjectForm.modules.css'

function ProjectForm({ handleSubmit, btnText, projectData }) {

  const [categories, setCategories] = useState([])
  const [project, setProject] = useState(projectData || {})

  useEffect(() => {
    fetch('http://localhost:5000/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data)
      })
  }, [])

  const submit = (e) => {
    e.preventDefault()
    handleSubmit(project)
  }

  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value })
    // console.log(project)
  }

  function handleCategory(e) {
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    })
    console.log(project)
  }
  return (
    <form onSubmit={submit} className={styles.form}>
      <div>
        <Input
          type="text"
          text="Nome do Projecto"
          name="name"
          placeholder="Insira o nome do projecto"
          handleOnChange={handleChange}
          value={project.name ? project.name : ''}
        />
        <Input
          type="number"
          text="Orçamento do projecto"
          name="budget"
          placeholder="Insira o orçamento total"
          handleOnChange={handleChange}
          value={project.budget ? project.budget : ''}
        />
        <Select
          name="category_id"
          text="Selecione uma Categoria"
          options={categories}
          handleOnChange={handleCategory}
          value={project.category ? project.category.id : ''}
        />
        <SubmitButton text={btnText} />
      </div>

    </form>
  )

}

export default ProjectForm