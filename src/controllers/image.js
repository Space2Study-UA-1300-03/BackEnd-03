import { imageService } from '#services/image.js'

export const updateImage = async (req, res) => {
  const updatedUser = await imageService.updateImage(req.user, req.file)

  res.status(201).json(updatedUser)
}
