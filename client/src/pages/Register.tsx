import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Captcha from "../components/Captcha";
import * as crypto from "crypto-js";
// import * as crypto from 'crypto';
// import {md5} from "ts-md5";

type LoginType = {
  name: string;
  password: string;
};
function calcularMD5(texto: string): any {
  const hashMD5 = crypto.MD5("md5");
  return hashMD5.toString();
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginType>();
  const [message, setmessage] = useState<string>();
  const [captchaDone, setCaptchaDone] = useState(false);

  const onSubmit: SubmitHandler<LoginType> = (data) => {
    const aux = { ...data, password: calcularMD5(data.password) as string };
    fetch(`http://localhost:3001/createUser/${JSON.stringify(aux)}`, {
      method: "POST",
    })
      .then((result) => {
        setmessage(`Usuario ${data.name} registrado exitosamente`);
        console.log(result);
        reset();
        setCaptchaDone(false);
        return result.json();
      })
      .then((json) => console.log(json))
      .catch((e) => console.log(e));
  };

  return (
    <div className="flex flex-col gap-1 text-xl font-semibold justify-center items-center w-screen h-screen bg-slate-300">
      <h1 className="text-4xl my-5 text-blue-700">Cara de libro</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" rounded-lg border p-20 shadow-lg w-2/3 bg-slate-100"
      >
        <div className="py-5 text-center">
          <h2 className="text-3xl">Registro</h2>
        </div>
        <div className="m-2 w-full">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            required
            className="bg-slate-200 rounded-md px-3 w-full"
            {...register("name")}
          />
          {errors.name && <span>{errors.name?.message}</span>}
        </div>
        <div className="m-2 w-full">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            required
            className="bg-slate-200 rounded-md px-3 w-full"
            {...register("password")}
          />

          {errors.password && <span>{errors.password?.message}</span>}
        </div>
        <div className="flex flex-col justify-center items-center p-4 gap-3">
          <Captcha onChange={() => setCaptchaDone(true)} />
          <button
            className="bg-blue-400 p-5 rounded-lg "
            type="submit"
            disabled={!captchaDone}
          >
            Registrarse
          </button>
          {message && (
            <span className="text-center text-blue-600">{message}</span>
          )}
        </div>
      </form>
    </div>
  );
};

export default Register;
