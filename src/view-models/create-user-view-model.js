const createUserViewModel = (typeDoc) => ({
  id: typeDoc._id,
  email: typeDoc.email,
  role: typeDoc.role,
  createdAt: typeDoc.createdAt,
  updatedAt: typeDoc.updatedAt,
});

module.exports = createUserViewModel;
