import { useState, useEffect, useMemo } from 'react'
import API from '../api/axios'
import { useAuth } from '../context/AuthContext'
import TaskForm from '../components/TaskForm'
import TaskItem from '../components/TaskItem'
import Toast from '../components/Toast'

const Dashboard = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [toast, setToast] = useState({ message: '', type: 'success' })
  const { user, logout } = useAuth()

  const showToast = (message, type = 'success') => setToast({ message, type })

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks')
      setTasks(res.data)
    } catch (err) {
      showToast('Failed to load tasks', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleAddTask = async (taskData) => {
    try {
      const res = await API.post('/tasks', taskData)
      setTasks(prev => [res.data, ...prev])
      showToast('Task added')
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to add task', 'error')
    }
  }

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await API.put(`/tasks/${id}`, { status })
      setTasks(prev => prev.map(t => (t._id === id ? res.data : t)))
      showToast('Status updated')
    } catch (err) {
      showToast('Failed to update task', 'error')
    }
  }

  const handleEdit = async (id, updates) => {
    try {
      const res = await API.put(`/tasks/${id}`, updates)
      setTasks(prev => prev.map(t => (t._id === id ? res.data : t)))
      showToast('Task updated')
    } catch (err) {
      showToast('Failed to update task', 'error')
    }
  }

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`)
      setTasks(prev => prev.filter(t => t._id !== id))
      showToast('Task deleted')
    } catch (err) {
      showToast('Failed to delete task', 'error')
    }
  }

  const stats = useMemo(() => ({
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inprogress: tasks.filter(t => t.status === 'inprogress').length,
    done: tasks.filter(t => t.status === 'done').length
  }), [tasks])

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
        (t.description || '').toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'all' || t.status === statusFilter
      const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter
      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [tasks, search, statusFilter, priorityFilter])

  if (loading) {
    return (
      <div className="dashboard-wrapper">
        <p style={{ color: 'white', textAlign: 'center', marginTop: '60px' }}>Loading your tasks...</p>
      </div>
    )
  }

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h1>📋 My Tasks</h1>
        <div className="user-badge">
          <span>Hi, {user?.name} 👋</span>
          <button className="btn btn-small btn-secondary" onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="stats-bar">
        <div className="stat-card total">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat-card todo">
          <div className="stat-number">{stats.todo}</div>
          <div className="stat-label">To Do</div>
        </div>
        <div className="stat-card inprogress">
          <div className="stat-number">{stats.inprogress}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card done">
          <div className="stat-number">{stats.done}</div>
          <div className="stat-label">Done</div>
        </div>
      </div>

      <TaskForm onAdd={handleAddTask} />

      <div className="card">
        <div className="toolbar">
          <input
            type="text"
            placeholder="🔍 Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="all">All priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="filter-pills">
          {['all', 'todo', 'inprogress', 'done'].map(s => (
            <div
              key={s}
              className={`pill ${statusFilter === s ? 'active' : ''}`}
              onClick={() => setStatusFilter(s)}
            >
              {s === 'all' ? 'All' : s === 'todo' ? 'To Do' : s === 'inprogress' ? 'In Progress' : 'Done'}
            </div>
          ))}
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🗒️</div>
          <p>{tasks.length === 0 ? 'No tasks yet. Add one above!' : 'No tasks match your filters.'}</p>
        </div>
      ) : (
        filteredTasks.map(task => (
          <TaskItem
            key={task._id}
            task={task}
            onUpdateStatus={handleUpdateStatus}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))
      )}

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </div>
  )
}

export default Dashboard