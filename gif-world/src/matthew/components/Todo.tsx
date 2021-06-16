import { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createTodo, deleteTodo } from '../../graphql/mutations'
import { listTodos } from '../../graphql/queries'
import awsExports from "../../aws-exports"
import { GraphQLResult } from '@aws-amplify/api-graphql'
import { withAuthenticator } from '@aws-amplify/ui-react'

//Testing Todo GraphQL API
Amplify.configure(awsExports);
const initialState = { name: '', description: '' }
declare class Todo {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}
interface listTodoResponse {
  listTodos: {
    items: Todo[]
  } 
}
interface createTodoResponse {
  createTodo: {
    id: string
  }
}
const TodoApp = () => {
  const [formState, setFormState] = useState(initialState)
  const [todos, setTodos] = useState<Todo[] | undefined>(undefined)

  useEffect(() => {
    fetchTodos()
  }, [])

  function setInput(key: any, value: string) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos)) as GraphQLResult<listTodoResponse>
      const todos = todoData.data!.listTodos.items
      setTodos(todos)
    } catch (err) { console.log('error fetching todos') }
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return
      const todo = { ...formState } as Todo
      const newTodo = await API.graphql(graphqlOperation(createTodo, {input: todo})) as GraphQLResult<createTodoResponse>
      const id = newTodo.data!.createTodo.id
      const new_todo = {...todo, id: id}
      if (todos) {
        setTodos([...todos, new_todo])
      } else {
        setTodos([new_todo])
      }
      setFormState(initialState)

    } catch (err) {
      console.log('error creating todo:', err)
    }
  }
  
  async function removeTodo(todo_id: string) {
    try {
      console.log(todo_id)
      await API.graphql(graphqlOperation(deleteTodo, {input: {id: todo_id}}))
      fetchTodos()
    } catch (err) {
      console.log('error deleting todo:', err)
    }
  }
  return (
    <div style={styles.container}>
      <h2>Amplify Todos</h2>
      <input
        onChange={event => setInput('name', event.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <input
        onChange={event => setInput('description', event.target.value)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <button style={styles.button} onClick={addTodo}>Create Todo</button>
      {
        todos?.map((todo, index) => (
          <div key={todo.id ? todo.id : index} style={styles.todo}>
            <p style={styles.todoName}>{todo.name}</p>
            <p style={styles.todoDescription}>{todo.description}</p>
            <button style={remove_button_styles} onClick={() => {removeTodo(todo.id)}}>Remove Todo</button>
          </div>
        ))
      }
    </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column' as 'column', justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' as 'bold'},
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}
const remove_button_styles = Object.create(styles.button)
remove_button_styles.backgroundColor = 'pink'

export default withAuthenticator(TodoApp)