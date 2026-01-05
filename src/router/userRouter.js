import express from 'express'
import { getAllUser } from '../controller/userController.js'

const route = express.Router()

route.get("/" , getAllUser)

export default route