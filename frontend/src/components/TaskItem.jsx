import { useState } from 'react'
import ConfirmModal from './ConfirmModal'

const TaskItem = ({ task, onUpdateStatus, onDelete, onEdit }) => {
  const [editing, setEditing] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description || '')
  const [priority, setPriority] = useState(task.priority)
  const [dueDate, setDueDate] = useState(task.dueDate ? task.dueDate.slice(0, 10) : '')

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done'

  const formatDate = (d) => {
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const handleSave = async () => {
    if (!title.trim()) return
    await onEdit(task._id, { title, description, priority, dueDate: dueDate || null })
    setEditing(false)
  }

  const handleCancel = () => {
    setTitle(task.title)
    setDescription(task.description || '')
    setPriority(task.priority)
    setDueDate(task.dueDate ? task.dueDate.slice(0, 10) : '')
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="task-item">
        <div className="input-group">
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="input-group">
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
        </div>
        <div className="form-row">
          <div className="input-group">
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="input-group">
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>
        </div>
        <div className="task-actions">
          <button className="btn btn-small" onClick={handleSave}>Save</button>
          <button className="btn btn-small btn-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div className={`task-item priority-${task.priority} status-${task.status}`}>
      <div className="task-top">
        <div style={{ flex: 1 }}>
          <div className="task-title">{task.title}</div>
          {task.description && <div className="task-desc">{task.description}</div>}
          <div className="task-meta">
            <span className={`badge ${task.priority}`}>{task.priority}</span>
            {task.dueDate && (
              <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
                📅 {formatDate(task.dueDate)} {isOverdue && '(overdue)'}
              </span>
            )}
          </div>
        </div>
        <div className="task-actions">
          <select
            value={task.status}
            onChange={(e) => onUpdateStatus(task._id, e.target.value)}
          >
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button className="icon-btn" onClick={() => setEditing(true)} title="Edit">✏️</button>
          <button className="icon-btn" onClick={() => setConfirmOpen(true)} title="Delete">🗑️</button>
        </div>
      </div>

      {confirmOpen && (
        <ConfirmModal
          title="Delete this task?"
          message={`"${task.title}" will be permanently deleted.`}
          onConfirm={() => { onDelete(task._id); setConfirmOpen(false) }}
          onCancel={() => setConfirmOpen(false)}
        />
      )}
    </div>
  )
}

export default TaskItem