import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import hbs from 'handlebars'
import App from '../components/app'

const router = express.Router()

router.get('/', async (req, res) => {
  const theHtml = `
    <div id="reactele">{{{reactele}}}</div>
    <script src="/app.js" charset="utf-8"></script>
    <script src="/vendor.js" charset="utf-8"></script>
  `

  const hbsTemplate = hbs.compile(theHtml)
  const reactComp = renderToString(<App />)
  const htmlToSend = hbsTemplate({ reactele: reactComp })
  res./* status(201). */send(htmlToSend)
})

export default router
