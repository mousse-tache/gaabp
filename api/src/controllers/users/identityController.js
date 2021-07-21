const boom = require('boom')
const mongoose = require('mongoose')
const User = require('../../models/User')
const axios = require("axios")
require('dotenv').config()
const jwt = require('jsonwebtoken');

// This should probably only be used if all JSON elements are strings
function xwwwfurlenc(srcjson){
    if(typeof srcjson !== "object")
      if(typeof console !== "undefined"){
        console.log("\"srcjson\" is not a JSON object");
        return null;
      }
    u = encodeURIComponent;
    var urljson = "";
    var keys = Object.keys(srcjson);
    for(var i=0; i <keys.length; i++){
        urljson += u(keys[i]) + "=" + u(srcjson[keys[i]]);
        if(i < (keys.length-1))urljson+="&";
    }
    return urljson;
}

async function getIdentityFromToken(response) {
    try {
        console.log(response)
        return await User.findOne({courriel:response.email})
    }
    catch (err) {
        throw boom.boomify(err)
    }
}

exports.initializeSession = async (req, reply) => {
  try {
    const { token } = req.body
    const url = `${"https://dev-132704.okta.com"}/oauth2/default/v1/introspect`
    const client = axios.create({
        baseURL: url,
        timeout: 1000,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(process.env.okta_identity_token+"").toString('base64')}`
          },
    });

    var data = xwwwfurlenc({
        "token_type_hint": "id_token",
        "token": token
    })

    var response = await client.post(url, data)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    var user = await getIdentityFromToken(response)

    if (user) {
      const jwttoken = jwt.sign({ identity: user.courriel, permissions: { _id: user._id, isAdmin: user.isAdmin, formations: user.formations, nominations: user.nominations.filter(x => !x.ed)} }, process.env.signingsecret);

      return { user, jwttoken }
    }

    return { user: null }
  } catch (err) {
    throw boom.boomify(err)
  }
}

