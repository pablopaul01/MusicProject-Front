import * as yup from "yup";

export const REGISTRO_SCHEMA = yup.object({
  name: yup.string().matches(/^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/, "Los nombres no son válidos").required("El nombre completo es requerido"),
  username: yup.string().matches(/^[a-zA-Z0-9._%+-ñáéíóúüÜ]+@[a-zA-Z0-9.-]+\.[a-zA-ZñáéíóúüÜ]{2,}$/i, "El email no es válido").required("El email es requerido"),
  password: yup.string().matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/, "La contraseña no es válida").required("La contraseña es requerida"),
  repassword: yup.string().oneOf([yup.ref("password"), null], "Las contraseñas no coinciden").required("La confirmación de contraseña es obligatoria"),
  dni: yup.string().matches(/^\d{7,8}$/, "DNI no válido").required("El DNI es requerido"),
  phone: yup.string().matches(/^\(?\d{2}\)?[\s\.-]?\d{4}[\s\.-]?\d{4}$/, "El número no es válido").required("El número de celular es requerido"),
  role: yup.string()
});

export const LOGIN_SCHEMA = yup.object({
  email: yup.string().matches(/^[a-zA-Z0-9._%+-ñáéíóúüÜ]+@[a-zA-Z0-9.-]+\.[a-zA-ZñáéíóúüÜ]{2,}$/, "El email no es un formato válido").required("El email es requerido"),
  password: yup.string().matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/, "La contraseña no es válida").required("La contraseña es requerida")
});

export const UPDATE_SCHEMA_PERFIL = yup.object({
  name: yup.string().matches(/^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/, "Los nombres no son válidos"),
  // password: yup.string().matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/, "La contraseña no es válida"),
  repassword: yup.string().oneOf([yup.ref("password"), null], "Las contraseñas no coinciden"),
  dni: yup.string().matches(/^\d{7,8}$/, "DNI no válido"),
  phone: yup.string().matches(/^\(?\d{2}\)?[\s\.-]?\d{4}[\s\.-]?\d{4}$/, "El número no es válido")
});

export const UPDATE_SCHEMA_ADMIN = yup.object({
  name: yup.string().matches(/^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/, "Los nombres no son válidos"),
  password: yup.string().matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/, "La contraseña no es válida"),
  repassword: yup.string().oneOf([yup.ref("password"), null], "Las contraseñas no coinciden"),
  dni: yup.string().matches(/^\d{7,8}$/, "DNI no válido"),
  phone: yup.string().matches(/^\(?\d{2}\)?[\s\.-]?\d{4}[\s\.-]?\d{4}$/, "El número no es válido"),
  role: yup.string().required("Seleccione un rol")
});

export const CREATEROOM_SCHEMA = yup.object({
  number: yup.string().matches(/^(?:[1-9]\d{0,2}|999)$/, "El valor debe ser un número válido").required("El nro de habitación es requerido"),
});

export const CREATECATEGORY_SCHEMA = yup.object().shape({
  title: yup.string().matches(/^[A-Za-z0-9\s]+$/, "Formato de nombre no válido").required('El título es requerido'),
  capacidadMax: yup.number().required('La capacidad máxima es requerida').positive('Debe ser un número positivo').integer('Debe ser un número entero'),
  descripcion: yup.string().required('La descripción es requerida'),
  precio: yup.number().required('El precio es requerido').positive('Debe ser un número positivo'),
  roomNumbers: yup.array().of(
    yup.object().shape({
      number: yup.number().positive('Debe ser un número positivo').integer('Debe ser un número entero'),
    })
  ),
});

export const UPDATECATEGORY_SCHEMA = yup.object().shape({
  title: yup.string().matches(/^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/, "Los nombres no son válidos"),
  capacidadMax: yup.number().positive('Debe ser un número positivo').integer('Debe ser un número entero'),
  descripcion: yup.string(),
  precio: yup.number().positive('Debe ser un número positivo'),
  roomNumbers: yup.array().of(
    yup.object().shape({
      number: yup.number().positive('Debe ser un número positivo').integer('Debe ser un número entero'),
    })
  ),
});

export const FORM_SCHEMA = yup.object({
  name: yup.string().matches(/^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/, "Los nombres no son válidos").required("El nombre completo es requerido"),
  surname: yup.string().matches(/^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/, "Los apellidos no son válidos").required("El nombre completo es requerido"),
  username: yup.string().matches(/^[a-zA-Z0-9._%+-ñáéíóúüÜ]+@[a-zA-Z0-9.-]+\.[a-zA-ZñáéíóúüÜ]{2,}$/i, "El email no es válido").required("El email es requerido"),
  description: yup.string().min(15,"Debe ingresar al menos 15 carácteres").max(200,"Supero la cantidad máxima de carácteres").required("El mensaje es requerido")
});