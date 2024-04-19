import { createContext, useCallback, useContext, useState } from "react";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { ChatContext } from "../context/chat/ChatContext";
import { types } from "../types/types";

export const AuthContext = createContext();

const initialState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);
  const { dispatch } = useContext(ChatContext);
  const login = async (email, password) => {
    const resp = await fetchSinToken("login", { email, password }, "POST");
    if (resp.ok) {
      const { email, nombre, uid } = resp.usuario;

      localStorage.setItem("token", resp.token);
      setAuth({
        uid,
        checking: false,
        logged: true,
        name: nombre,
        email,
      });
    }
    return resp.ok;
  };
  const register = async (nombre, email, password) => {
    const resp = await fetchSinToken(
      "login/new",
      { nombre, email, password },
      "POST"
    );
    console.log(resp);
    if (resp.ok) {
      const { nombre, email, uid } = resp.usuario;
      localStorage.setItem("token", resp.token);
      setAuth({
        uid,
        checking: false,
        logged: true,
        name: nombre,
        email,
      });
    }
    return { ok: resp.ok, msg: resp.msg };
  };

  const verificaToken = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });
      return false;
    }
    const resp = await fetchConToken("login/renew");
    if (resp.ok) {
      const { nombre, email, uid } = resp.usuario;
      localStorage.setItem("token", resp.token);
      setAuth({
        uid,
        checking: false,
        logged: true,
        name: nombre,
        email,
      });
      return true;
    } else {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });
      return false;
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");

    dispatch({ type: types.cerrarSesion });

    setAuth({
      checking: false,
      logged: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        register,
        verificaToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
