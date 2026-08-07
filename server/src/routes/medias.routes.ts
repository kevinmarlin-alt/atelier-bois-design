import express from "express";
import { mediasControllers } from '../controllers/medias.controllers.js'

const router = express.Router();

router.get('/:id_project/medias/id_media', mediasControllers.getMediasById);
router.get('/:id_project/medias', mediasControllers.getAllMediasOfProject);
router.post('/:id_project/medias', mediasControllers.createOneMedia);
router.patch('/:id_project/medias/:id_media', mediasControllers.updateOneMedia);
router.delete('/:id_project/medias/:id_media', mediasControllers.deleteOneMedia);

export { router }