// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { DomicilioService } from "../services/DomicilioService";
// import CerramientoForm from "../templates/editarDomicilio/CerramientoForm/CerramientoForm";
// const CrearCerramiento = () => {
//   const [materiales, setMateriales] = useState([]);

//   useEffect(() => {
//     DomicilioService.getMateriales()
//       .then((response) => setMateriales(response))
//       .catch((error) => console.log(error));
//   }, []);

//   const {
//     handleSubmitCerramiento,
//     reset,
//     watch,
//     setValue,
//     register: registerCerramiento,
//     getValues,
//   } = useForm({
//     defaultValues: {
//       denominacion: "",
//       superficie: "",
//       tipo: "",
//       orientacion: "",
//       material: "",
//     },
//   });
//   const superficie = () => getValues("ancho") * getValues("alto");
//   const onSubmitCerramiento = (data) => console.log(data, superficie());
//   return (
//     <CerramientoForm
//       materiales={materiales}
//       handleSubmitCerramiento={handleSubmitCerramiento(onSubmitCerramiento)}
//       registerCerramiento={registerCerramiento}
//     />
//   );
// };

// export default CrearCerramiento;
