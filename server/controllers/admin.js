const User = require('../models/user');

// POST - Add a new product
exports.postAddProduct = async (req, res, next) => {
  console.log(req.body)
  try {
    const { username, phone, email } = req.body;

    const product = await User.create({
      username: username,
      phone: phone,
      email:email
    });

    console.log('Created Product');
    res.status(201).json({ message: 'Product created successfully', user: product }); // 201 Created status
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating product', error: err.message }); // 500 Internal Server Error
  }
};

// GET - Fetch a single product for editing
exports.getEditProduct = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Product not found' }); // 404 Not Found
    }

    res.status(200).json({ user: user });  // 200 OK
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching user', error: err.message }); // 500 Internal Server Error
  }
};

// PUT - Update an existing product
exports.putEditProduct = async (req, res, next) => {  // Changed to PUT for updates
  const userId = req.params.userId;
  const { username, phone, email } = req.body;  // Destructure from req.body

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'user not found' });  // 404 Not Found
    }

    user.username = username,
    user.phone = phone,
    user.email = email

    await user.save();

    console.log('user updated');
    res.status(200).json({ message: 'Product updated successfully', user: user }); // 200 OK
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating product', error: err.message });  // 500 Internal Server Error
  }
};


// GET - Fetch all products
exports.getProducts = async (req, res, next) => {
  try {
    const user = await User.findAll();
    res.status(200).json({ users: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching products', error: err.message }); // 500 Internal Server Error
  }
};


// DELETE - Delete a product
exports.deleteProduct = async (req, res, next) => { // Changed to DELETE
  const userId = req.params.userId;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'user not found' }); // 404 Not Found
    }

    await user.destroy();

    console.log('DESTROYED user');
    res.status(200).json({ message: 'user deleted successfully' }); // 200 OK
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting user', error: err.message }); // 500 Internal Server Error
  }
};
