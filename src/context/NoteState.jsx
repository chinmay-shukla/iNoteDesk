import React, { useContext, useEffect } from "react";
import NoteContext from "./noteContext";
import { useState } from "react";
import { alertContext } from "./alertContext";
import { useNavigate } from "react-router-dom";

const NoteState = (props) => {
  const url = "https://i-notedesk.vercel.app";

  // show alerts
  const [erroralert, setErroralert] = useState({ alert: false, info: { level: "green", errors: "" } })
  const { setShowalert, setShowloading } = useContext(alertContext)

  useEffect(() => {
    setShowalert(erroralert)
  }, [erroralert.alert])

  const navigate = useNavigate()

  // main code
  const initial_auth_token = localStorage.getItem("token");
  const [auth_token, setAuthToken] = useState(initial_auth_token);

  const [Notes, setNotes] = useState([]);
  const [serachnotes, setSearchnote] = useState([])


  const [info, serInfo] = useState({});


  const getallnotes = async () => {
    if (auth_token !== null) {
      setShowloading(true)
      try {
        const response = await fetch(`${url}/api/notes/fetchallnotes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": auth_token,
          },
        });

        if (response.status) setShowloading(false)

        if (response.status === 401) {
          localStorage.removeItem('token')
          navigate("/signin")
        }


        const json = await response.json();
        setNotes(json);
      } catch (error) { }
    }
  };

  const addnotes = async (data) => {
    if (auth_token !== null) {
      setShowloading(true)
      try {
        const response = await fetch(`${url}/api/notes/addnote`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "auth-token": auth_token,
          },
          body: JSON.stringify({
            title: data.title,
            description: data.description,
            tag: data.tag,
          }),
        });

        if (response.status) setShowloading(false)

        if (response.status === 401) {
          localStorage.removeItem('token')
          navigate("/signin")
        }

        if (response.status === 400) {
          setErroralert({ alert: true, info: { level: "info", errors: "Please enter correct title and description" } })
        }

        if (response.status === 200) {
          setErroralert({ alert: true, info: { level: "green", errors: "Note added sucessfully" } })
          navigate("/")
          const json = await response.json()
          setNotes([...Notes, json])
        }

      } catch (error) { }
    }
  };

  const deletenotes = async (_id) => {
    if (auth_token !== null) {
      setShowloading(true)
      try {
        const response = await fetch(`${url}/api/notes/deletenote/${_id}`, {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            "auth-token": auth_token,
          },
        });

        if (response.status) setShowloading(false)

        if (response.status === 404) {
          setErroralert({ alert: true, info: { level: "danger", errors: "Note doesn't found" } })
        }

        if (response.status === 401) {
          localStorage.removeItem('token')
          navigate("/signin")
        }

        if (response.status === 200) {
          const newNotes = Notes.filter((note) => {
            return note._id !== _id;
          });
          setNotes(newNotes);
        }


      } catch (error) {
        // console.error(error)
      }
    }
  };
  const editnotes = async (_id, data) => {
    if (auth_token !== null) {
      setShowloading(true)
      try {
        const response = await fetch(`${url}/api/notes/updatenote/${_id}`, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            "auth-token": auth_token,
          },
          body: JSON.stringify({
            title: data.title,
            description: data.description,
            tag: data.tag,
          }),
        });

        if (response.status) setShowloading(false)

        if (response.status === 404) {
          setErroralert({ alert: true, info: { level: "danger", errors: "Note doesn't found" } })
        }

        if (response.status === 401) {
          localStorage.removeItem('token')
          navigate("/signin")
        }

        if (response.status === 200) {
          const json = await response.json();
          const { title, description, tag } = json;

          const editedNote = Notes.map((data) => {
            if (data._id === json._id) {
              return {
                ...data,
                title,
                description,
                tag,
              };
            }
            return { ...data }; // Return a copy of the original 'data'
          });

          setNotes(editedNote);
        }

      } catch (error) {
        // console.error(error)
      }
    }
  };

  const getuserinfo = async () => {
    if (auth_token !== null) {
      try {
        const response = await fetch(`${url}/api/auth/getuser`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "auth-token": auth_token,
          },
        });

        if (response.status === 401) {
          localStorage.removeItem('token')
          navigate("/signin")
        }

        if (response.status === 200) {
          const json = await response.json();
          serInfo(json.user);
        }

        // console.log(info);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{
        Notes,
        setNotes,
        getallnotes,
        addnotes,
        deletenotes,
        editnotes,
        serachnotes,
        setSearchnote,
        getuserinfo,
        info,
        setAuthToken
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
