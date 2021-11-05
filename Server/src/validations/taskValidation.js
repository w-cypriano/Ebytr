const badRequest = 400;
const taskValidate = (req, res, next) => {
    const { task } = req.body; 
   
    if (!task || task === '') {
      return res.status(badRequest).json({ message: '"Task" is required' });
    }
       next();
  };
  
  const statusValidate = (req, res, next) => {
    const { status } = req.body;
    if (status !== 'Pendente') {
      return res.status(badRequest).json({ message: 'initial status must be pending' });
    }
        next();
  };

  const statusValidateExist = (req, res, next) => {
    const { status } = req.body;
    if (!status || status === '') {
      return res.status(badRequest).json({ message: '"Status" is required' });
    }
        next();
  };

  module.exports = { taskValidate, statusValidate, statusValidateExist }