const boom = require('boom')
const mongoose = require('mongoose');
const Decoration = require('../models/Decoration');
const { PermissionTypes } = require('../security/permissionTypes');
const { Permissions } = require('../security/permissions');
require('dotenv').config()
const jwt = require('jsonwebtoken');

exports.getDecorationsForUser = async (req, reply) => {
    try {
        const id = req.params.id
        return await Decoration.find({membre: mongoose.Types.ObjectId(id)})
      } catch (err) {
        throw boom.boomify(err)
      }
}