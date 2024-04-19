const { nanoid } = require("nanoid");
const notes = require("./notes");

const addHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  const success = notes.filter((note) => note.id === id).length > 0;

  if (success) {
    const response = h.response({
      status: "success",
      message: "note success add",
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "failed",
    message: "note failed add",
  });
  response.code(500);
  return response;
};

const getAllNotes = () => ({
  status: "success",
  data: {
    notes,
  },
});

const getNoteById = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      message: "success",
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "note not found",
  });

  response.code(404);
  return response;
};

const updateNote = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: "success",
      message: "update note is success",
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "update note is not success",
  });
  response.code(404);
  return response;
};

const deleteNote = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'delete note is success'
    })
    response.code(201)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'delete note is not success'
  })
  response.code(404)
  return response
};

module.exports = {
  addHandler,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
};
