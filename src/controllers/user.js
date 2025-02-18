import { userService } from '#services/user.js'

export const getMe = async (req, res) => {
  res.status(200).json(req.user)
}

export const updateUser = async (req, res) => {
  const updatedUser = await userService.updateUser(req.user, req.body)

  res.status(201).json(updatedUser)
}

export const updateStatus = async (req, res) => {
  const { id } = req.params
  const updateData = req.body

  await userService.updateStatus(id, updateData)

  res.status(204).end()
}

export const deleteUser = async (req, res) => {
  const { id } = req.params

  await userService.deleteUser(id)

  res.status(204).end()
}
