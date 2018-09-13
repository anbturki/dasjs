const UserController = {
  index (req, res) {
    const id = req.params.id
    return {
      name: 'ali',
      id
    }
  }
}

module.exports = UserController
