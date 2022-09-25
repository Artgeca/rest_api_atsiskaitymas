const createTypeViewModel = (typeDoc) => ({
  id: typeDoc._id,
  title: typeDoc.title,
  img: typeDoc.img,
  createdAt: typeDoc.createdAt,
  updatedAt: typeDoc.updatedAt,
});

module.exports = createTypeViewModel;
