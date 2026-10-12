import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
  withCredentials: true,
})

export const registerUser = data =>
  api.post('/auth/register', data).then(r => r.data)

export const loginUser = data =>
  api.post('/auth/login', data).then(r => r.data)

export const getCurrentUser = () =>
  api.get('/auth/me').then(r => r.data)

export const logoutUser = () =>
  api.post('/auth/logout').then(r => r.data)

export const getLatest = () =>
  api.get('/telemetry/latest').then(r => r.data)

export const getHistory = () =>
  api.get('/telemetry/history?limit=30').then(r => r.data)

export const getStatus = () =>
  api.get('/mission/status').then(r => r.data)

export const getSubsystems = () =>
  api.get('/subsystems').then(r => r.data)

export const getCommands = () =>
  api.get('/commands').then(r => r.data)

export const sendCommand = command =>
  api.post('/commands', { command }).then(r => r.data)

export const getAlarms = () =>
  api.get('/alarms').then(r => r.data)

export const acknowledgeAlarm = id =>
  api.put(`/alarms/${id}/acknowledge`).then(r => r.data)
