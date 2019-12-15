const getTableData = (req, res, db) => {
  db.select('*')
    .from('testtable1')
    .then(items => {
      if (items.length) {
        res.json(items);
      } else {
        res.json({ dataExists: 'false' });
      }
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }));
};

const getTableDataFromId = (req, res, db) => {
  const { id } = req.params;
  db('testtable1')
    .where({ id })
    .then(items => {
      if (items.length) {
        res.json(items);
      } else {
        res.json({ dataExists: 'false' });
      }
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }));
};

const postTableData = (req, res, db) => {
  const { id, name, description, statut, comment } = req.body;
  const creation_date = new Date();
  const reminder_date = new Date();
  reminder_date.setDate(reminder_date.getDate() + 1);

  db('testtable1')
    .insert({
      id,
      name,
      description,
      statut,
      creation_date,
      reminder_date,
      comment
    })
    .returning('*')
    .then(item => {
      res.json(item);
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }));
};

const putTableData = (req, res, db) => {
  const { id, name, description, statut, comment } = req.body;
  db('testtable1')
    .where({ id })
    .update({ id, name, description, statut, comment })
    .returning('*')
    .then(item => {
      res.json(item);
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }));
};

const deleteTableData = (req, res, db) => {
  const { id } = req.body;
  db('testtable1')
    .where({ id })
    .del()
    .then(() => {
      res.json({ delete: 'true' });
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }));
};

module.exports = {
  getTableData,
  getTableDataFromId,
  postTableData,
  putTableData,
  deleteTableData
};
