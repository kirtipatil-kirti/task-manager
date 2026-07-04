import { useState } from 'react'

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return

    setSubmitting(true)
    await onAdd({ title, description, priority, dueDate: dueDate || null })

    setTitle('')
    setDescription('')
    setPriority('medium')
    setDueDate('')
    setSubmitting(false)
  }

  return (
    <div className="card">
      <h3>➕ Add New Task</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Title</label>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Description</label>
          <textarea
            placeholder="Add more detail (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
          />
        </div>
        <div className="form-row">
          <div className="input-group">
            <label>Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="input-group">
            <label>Due date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="btn" disabled={submitting}>
          {submitting ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    </div>
  )
}

export default TaskForm