import { pool } from '../db.js'

export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query('select * from employee')
    res.send(rows)
  } catch (error) {
    return res.status(500).json({
      message: 'Algo fue mal'
    })
  }
}

export const getEmployeesForId = async (req, res) => {
  try {
    const [rows] = await pool.query('select * from employee where id=?', [
      req.params.id
    ])

    rows[0] != null
      ? res.json(rows[0])
      : res.status(404).send('No existe el empleado')
  } catch (error) {
    return res.status(500).json({
      message: 'Algo fue mal'
    })
  }
}

export const createEmployees = async (req, res) => {
  const { name, salary } = req.body
  try {
    const [rows] = await pool.query(
      'insert into employee (name,salary) values (?,?)',
      [name, salary]
    )

    res.send({
      id: rows.insertId,
      name,
      salary
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Algo fue mal'
    })
  }
}

export const updateEmployees = async (req, res) => {
  const id = req.params.id

  const { name, salary } = req.body

  try {
    const [result] = await pool.query(
      'update employee set name= ifnull(?,name),salary= ifnull(?,salary) where id=?',
      [name, salary, id]
    )

    const [rows] = await pool.query('select * from employee where id=?', [id])

    result.affectedRows <= 0
      ? res.status(404).send('No se actualizo nada')
      : res.send(rows[0])
  } catch (error) {
    return res.status(500).json({
      message: 'Algo fue mal'
    })
  }
}

export const deleteEmployees = async (req, res) => {
  try {
    const [result] = await pool.query('delete from employee where id=?', [
      req.params.id
    ])

    result.affectedRows <= 0
      ? res.status(404).send('No se elimino nada')
      : res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({
      message: 'Algo fue mal'
    })
  }
}
