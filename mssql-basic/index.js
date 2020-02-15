const sql = require('mssql')

let check = async () => {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect('mssql://sa:password@localhost:65269/calendar')
    const result = await sql.query`select * from [dbo.events] where id = 0`
    console.log(result)
  } catch (err) {
    console.log(err)
  }
}

check()