import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useRoute, useRouter } from "wouter";
import { navigate } from "wouter/use-location";

type LoginType = {
  name: string;
  password: string;
};
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>();

  const [rol, setRol] = useState("");
  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<LoginType> = (data) => {
    fetch(`http://localhost:3001/verifyUser/${data.name}/${data.password}`, {
      method: "POST",
    })
      .then((response) => {
        // if (!response.ok) {
        //   setError("usuario no existe");
        //   throw error;
        // }
        return response.json();
      })
      .then((json) => {
        setRol(json.rol);
        setError("");
        setTimeout(() => {
          if (json.rol === "admin") {
            navigate("/users", { replace: true });
          } else {
            navigate("/profile", { replace: true });
          }
        }, 3000);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="flex flex-row gap-1 text-xl font-semibold justify-center items-center w-screen h-screen bg-slate-300">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" rounded-lg border p-20 shadow-lg w-2/3 bg-slate-100"
      >
        <div className="py-5 text-center">
          <h2 className="text-3xl">Inicio de Sesión</h2>
        </div>
        <div className="m-2 w-full">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
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
            className="bg-slate-200 rounded-md px-3 w-full"
            {...register("password")}
          />

          {errors.password && <span>{errors.password?.message}</span>}
        </div>
        <div className="flex items-center content-center justify-center mt-10">
          <button className="bg-blue-400 p-5 rounded-lg" type="submit">
            Iniciar sesión
          </button>
        </div>
        {rol !== "" && <h1>Su rol es: {rol}</h1>}
        {error !== "" && <h1 className="text-red-500">{error}</h1>}
      </form>
    </div>
  );
};

export default Login;
