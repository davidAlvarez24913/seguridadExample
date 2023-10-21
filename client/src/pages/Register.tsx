import { SubmitHandler, useForm } from "react-hook-form";

type LoginType = {
  name: string;
  password: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>();

  const onSubmit: SubmitHandler<LoginType> = (data) => {
    fetch(`http://localhost:3001/createUser/${data}`, {
      method: "POST",
      mode: "no-cors",
    }).catch((e) => console.log(e));
    console.log(data);
  };

  return (
    <div className="flex flex-row gap-1 text-xl font-semibold justify-center items-center w-screen h-screen bg-blue-700">
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
          <button className="bg-green-400 p-5 rounded-lg" type="submit">
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
