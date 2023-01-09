const Person = require('../models/Person.js');

const getAllPersons = async (req, res) => {
  try {
    const persons = await Person.find().exec();

    res.json(persons);
  } catch (error) {
    res.status(500).json({ message: 'Не удалось создать статью' });
    console.log(error);
  }
};

const createPerson = async (req, res) => {
  try {
    const doc = new PersonModel({
      name: req.body.person,
      data: [{ y: req.body.weight, x: req.body.day }],
    });

    const person = await doc.save();
    res.json(person);
  } catch (error) {
    res.status(500).json({ message: 'Не удалось создать пользователя' });
    console.log(error);
  }
};

const updatePerson = async (req, res) => {
  try {
    const personName = req.body.person;
    const personData = await Person.find(
      { name: personName },
      { data: 1, _id: false },
    ).exec();
    const data1 = personData.map((obj) => obj.data).flat();

    const newperson = await Person.findOneAndUpdate(
      {
        name: personName,
      },
      {
        data: [...data1, { y: req.body.weight, x: req.body.day }],
      },
      {
        returnDocument: 'after',
      },
    );
    res.json(newperson);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Не удалось обновить данные пользователя' });
    console.log(error);
  }
};

module.exports = { updatePerson, createPerson, getAllPersons };
