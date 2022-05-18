import axios from "axios";
import { useNavigate } from "solid-app-router";
import { createSignal } from "solid-js";
import request from "../../api/request";

const Login = () => {
  const [uname, setUname] = createSignal("");
  const [password, setPassword] = createSignal("");
  const nav = useNavigate();

  const handlerLogin = async () => {
    let resp = await request.login(uname(), password());

    if (resp.data.code != 0) {
      alert(resp.data.message);
      return;
    }

    localStorage.setItem("token", resp.data.data.accessToken);
    nav("/withdrawlist");
  };

  return (
    <div class="flex flex-col justify-center items-center h-full">
      <p class="mb-5 text-xl antialiased font-bold">老爸当家财务系统</p>
      <div class="flex flex-col items-center">
        <input
          class="input w-full max-w-xs input-bordered mb-3"
          placeholder="请输入用户名"
          value={uname()}
          onChange={(e) => setUname(e.target.value)}
        />
        <input
          class="input w-full max-w-xs input-bordered mb-3"
          placeholder="请输入密码"
          type={"password"}
          value={password()}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          onClick={() => {
            handlerLogin();
          }}
          class="w-60 h-10 btn"
        >
          登录
        </button>
      </div>
    </div>
  );
};

export default Login;
