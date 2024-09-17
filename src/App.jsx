import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

uuidv4();

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(false);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let storedTodos = JSON.parse(todoString);
      setTodos(storedTodos);  // Load todos from localStorage
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex((item) => item.id === id);

    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  const toggleFinishes = () => {
    setshowFinished(!showFinished);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-2 my-5 rounded-xl p-5 bg-pink-100 min-h-[80vh]">
        <h1 className='font-bold text-center text-3xl'>
          iTask - Manage your todos at one place
        </h1>

        <div className="addtodo my-5">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-[70%]"
          />
          <button
            onClick={handleAdd}
            className="bg-pink-400 hover:bg-pink-600 p-3 py-1 text-white rounded-md mx-6 text-sm"
            disabled={todo.length <= 3}
          >
            Save
          </button>
        </div>

        <input
          onChange={toggleFinishes}
          type="checkbox"
          checked={showFinished}
        /> Show Finished
        <hr />


        <h2 className="text-lg font-bold">Your ToDos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="m-5">No ToDos to Display</div>
          )}
          {todos.map((item) => (
            (showFinished || !item.isCompleted) && (
              <div key={item.id} className="todo flex justify-between w-1/2 my-3">
                {/* Group the checkbox and task together */}
                <div className="flex items-center space-x-2">
                  <input
                    name={item.id}
                    type="checkbox"
                    checked={item.isCompleted}
                    onChange={handleCheckbox}
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                {/* Edit and Delete Buttons */}
                <div className="buttons flex h-full">
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="bg-pink-400 hover:bg-pink-600 p-3 py-1 text-white rounded-md mx-1 text-sm"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-pink-400 hover:bg-pink-600 p-3 py-1 text-white rounded-md mx-1 text-sm"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
