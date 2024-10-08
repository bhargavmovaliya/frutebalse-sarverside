
const multer = require('multer');
const fs = require("fs")
const path = require("path")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let FilePath = path.join("public", file.fieldname)
    console.log("cdd", FilePath);

    fs.mkdir(FilePath, { recursive: true }, (err) => {
      if (err) {
        cb(err)
      }
    })
    cb(null,FilePath)

  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }

})

const upload = multer({ storage: storage })

module.exports = upload
