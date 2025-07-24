import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../api/apiAxios";

function LogIn() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const enterRequest = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await request<{ token: string }>("/api/hr/user/sign-in", "POST", {
        username,
        password,
      });
      
      localStorage.setItem("token", res.token);
      if (res.token) navigate("/main");
      console.log(res.token);
    } catch (error) {
      console.log(error, "nimadur xato");
      alert("Xato parol yoki foydalanuvchi ismi");
    } finally {
      setUsername("");
      setPassword("");
    }
  }, [username, password, navigate]);

  return (
    <div className="w-full h-full absolute flex items-center justify-center gap-5">
      <form
        className="rounded-[20px] shadow-[0px_1px_10px_black] flex flex-col gap-5 p-5"
        onSubmit={enterRequest}
      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          className="border-1 border-gray-700 p-2 rounded-sm"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="border-1 border-gray-700 p-2 rounded-sm"
        />
        <button
          type="submit"
          className="w-full bg-black rounded-sm text-white p-2 hover:cursor-pointer"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

export default LogIn;