const getClients = (req, res, db) => {
  db.select('*')
    .from('clients')
    .then(items => {
      if (items.length) {
        res.json(items);
      } else {
        res.json({ dataExists: 'false' });
      }
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }));
};

const postClient = (req, res, db) => {
  const { id, name, location } = req.body;

  db('clients')
    .insert({
      id,
      name,
      location
    })
    .returning('*')
    .then(item => {
      res.json(item);
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }));
};

module.exports = {
  getClients,
  postClient
};
