import React from "react";

function Todo({ todos, setTodos, categories, setCategories, addNew, setAddNew, error, setError, newTodo, setNewTodo }) {
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 3,
        alignSelf: "center",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
      id="addTodo"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (newTodo.heading && newTodo.time && newTodo.timeRaw) {
            setTodos([
              ...todos,
              {
                title: newTodo.heading,
                description: newTodo.description ? newTodo.description : "",
                category: newTodo.category ? newTodo.category : "",
                time: newTodo.timeRaw,
              },
            ]);
            setNewTodo({ heading: "", category: "", description: "", time: "", timeRaw: "" });
            setAddTodo(false);
            setError(false);
          } else {
            setError(true);
          }
        }}
        style={{
          display: "flex",
          flexFlow: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "linear-gradient(135deg, #aeffb0 10%, #085f6f 90%) ",
          paddingBottom: "5vmin",
          width: "50vw",
          border: "solid #003038 0.7vmin",
          borderRadius: "3vmin",
          gap: "1vmin",
        }}
      >
        <span
          onClick={() => {
            setAddTodo(false);
            setError(false);
            setNewTodo({ heading: "", category: "", description: "", time: "", timeRaw: "" });
          }}
          id="closeANT"
        >
          X
        </span>
        <h2 id="ANTHeading">Add New Todo</h2>
        <input
          type="text"
          name="todo-heading"
          value={newTodo.heading}
          style={{ borderColor: error ? "red" : "#00252c" }}
          placeholder="Title/Heading"
          onChange={(e) => {
            setNewTodo({ ...newTodo, heading: e.target.value });
          }}
        />
        <input
          type="datetime-local"
          name="dateTime"
          id="date"
          style={{ borderColor: error ? "red" : "#00252c" }}
          value={newTodo.time}
          onChange={(e) => {
            setNewTodo({ ...newTodo, timeRaw: new Date(e.target.value), time: e.target.value });
          }}
        />
        <div>
          <label htmlFor="catefory" id="catLab">
            Category (optional)
          </label>
          <select
            name="category"
            id="category"
            onChange={(e) => {
              if (e.target.value == "Add New") {
                setAddNew(true);
                setNewTodo({ ...newTodo, category: "" });
              } else {
                setAddNew(false);
                setNewTodo({ ...newTodo, category: e.target.value });
              }
            }}
          >
            <option value="Add New">Add New</option>
            {categories.map((item, index) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
        </div>
        {addNew && (
          <input
            type="text"
            name="category"
            value={newTodo.category}
            onChange={(e) => {
              setNewTodo({ ...newTodo, category: e.target.value });
            }}
            placeholder="New Category"
          />
        )}
        <textarea
          style={{ resize: "none" }}
          name="description"
          id=""
          cols="30"
          rows="10"
          placeholder="Description (optional)"
          value={newTodo.description}
          onChange={(e) => {
            setNewTodo({ ...newTodo, description: e.target.value });
          }}
        ></textarea>
        <button>Edit</button>
      </form>
    </div>
  );
}

export default Todo;
