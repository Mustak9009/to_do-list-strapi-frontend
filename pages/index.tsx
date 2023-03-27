import type { GetServerSideProps } from "next";
import Head from "next/head";
import { MdAddBox, MdOutlineDeleteOutline } from "react-icons/md";
import { gql } from "graphql-request";
import { dataTunnel } from "../data/dataTunnel";
import { useRef, useState } from "react";
import {getSession} from "next-auth/react";      

type ToDo = {
  id: string;
  attributes: {
    title: string;
    complete: boolean;
  }; //single todo
};
type ToDoType = {
  //Multiple todo's
  data: [ToDo];
};
export default function Home({ todos}: { todos: ToDoType }) {
  const [todoInput, setTodoInput] = useState<string>("");
  const [newTodos, setNewTodos] = useState<ToDo[]>([...todos.data || '']); //Add one array using => ... spread operator
  const [inputEmpty, setInputEmpty] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      createTodo();
    }
    if (event.key === "Delete" && buttonRef.current) {
      buttonRef.current.click();
    }
  };
  async function createTodo() {
    setTodoInput("");
    const createTodo = gql`
      mutation createTodo($title: String!, $complete: Boolean) {
        createTodo(data: { title: $title, complete: $complete }) {
          data {
            id
            attributes {
              title
              complete
            }
          }
        }
      }
    `;
    if (todoInput != "") {
      const data = await dataTunnel(createTodo, {
        title: todoInput,
        complete: false,
      });
      setNewTodos((olditem: ToDo[]) => {
        return [...olditem, data.createTodo.data];
      });
      setInputEmpty(false);
    } else setInputEmpty(true);
  }
  async function delteTodo(id: string) {
    //$id:ID! type -> according Graphql rule
    const delteTodo = gql`
      mutation deleteTodo($id: ID!) {
        deleteTodo(id: $id) {
          data {
            id
          }
        }
      }
    `;
    const data = await dataTunnel(delteTodo, { id }); //You can also do this -> id:id
    const authorTodo = newTodos.filter(
      (item) => item.id != data.deleteTodo.data.id
    );
    setNewTodos(authorTodo);
  }
  async function clearAll() { //I use fetch api because -> grphql custom controller not work at this thime .. why i'do not know
    const ids:string[] = newTodos.map((item)=>item.id);
    // await fetch("http://localhost:1337/api/todos/deleteAll", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   body: JSON.stringify({
    //     data: {
    //       ids, //send todo's ids
    //     },
    //   }),
    // });
    const deleteAllTodo = gql`
      mutation DeleteAllTodo($ids:[String!]){
        deleteAllTodo(ids:$ids){
          count
        }
      }
    `;
    try{
      await dataTunnel(deleteAllTodo,{ids});
      setNewTodos([]); //newTodos is empty.
    }catch(err){
      console.log(err);
    }
  }
  return (
    <>
      <Head>
        <title>Todo application</title>
        <meta name="description" content="That is a simple todo app which can you used to add your daily work's."/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto">
        <div className="min-h-screen  flex justify-center items-center">
          <div className="p-2 bg-white rounded-sm shadow-lg">
            <header className="m-2">
              <h1 className="font-display text-3xl tracking-wide text-gray-700">
                ToDo App 😊
              </h1>
              <div className="flex justify-between items-center">
                <input type="text" id="add_todo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm h-8 w-80 p-1 mt-4 mb-2 outline-none font-semibold" placeholder="Add your new todo" name="addTodo" onChange={(e) => setTodoInput(e.target.value)} value={todoInput} onKeyDown={handleKeyPress}/>
                <MdAddBox className="text-[#8e4ae5] text-4xl ml-2 mt-2 cursor-pointer" type="button" onClick={() => createTodo()}/>
              </div>
              <p className="text-red-500 font-medium">
                {inputEmpty && "Please add some text in input box.."}
              </p>
            </header>
            <section className="mb-5 mx-2 overflow-hidden">
              {newTodos.length != 0 ? (
                newTodos.map((item: ToDo) => (
                  <div key={item.id} className="flex justify-between items-center bg-gray-100 rounded-sm  my-3 hover:scale-105 cursor-pointer">
                    <p className="font-medium p-2 ml-2">
                      {item.attributes.title}
                    </p>
                    <button ref={buttonRef} onClick={() => delteTodo(item.id)}>
                      <MdOutlineDeleteOutline className="cursor-pointer  h-10 text-3xl hover:text-white hover:bg-red-500 rounded-tr-sm rounded-br-sm mr-3" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="bg-gray-200 p-3 rounded-sm">
                  <p className="text-gray-500 font-medium">
                    Please add your toTo item...😉
                  </p>
                </div>
              )}
            </section>
            {newTodos.length != 0 && (
              <footer>
                <div className="flex justify-between mx-2">
                  <p className="text-gray-500 font-medium">
                    You have {newTodos.length} pending tasks
                  </p>
                  <button className="bg-[#8e4ae5] text-white px-3  py-1 rounded-[4px]" type="button" onClick={() => clearAll()}>
                    Clear All
                  </button>
                </div>
              </footer>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
const query = gql`
  query {
    todos {
      data {
        id
        attributes {
          title
          complete
        }
      }
    }
  }
`;
export const getServerSideProps: GetServerSideProps = async ({req}:{req:any}) => {
  const data = await dataTunnel(query);
  const sesson = await getSession({req});
  if(!sesson){
    return{ //This code help to redirect user ... when user not have sesson
      redirect:{
        destination:'/login',
        permanent:false
      }
    }
  }
  return {
    props: {
      todos: data?.todos || []
    },
  };
};
