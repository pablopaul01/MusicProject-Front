import * as yup from "yup";

export const REGISTRO_SCHEMA = yup.object({
  name: yup.string().matches(/^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/, "Los nombres no son válidos").required("El nombre completo es requerido"),
  lastname: yup.string().matches(/^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/, "Los nombres no son válidos").required("El nombre completo es requerido"),
  email: yup.string().matches(/^[a-zA-Z0-9._%+-ñáéíóúüÜ]+@[a-zA-Z0-9.-]+\.[a-zA-ZñáéíóúüÜ]{2,}$/i, "El email no es válido").required("El email es requerido"),
  password: yup.string().matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/, "La contraseña no es válida").required("La contraseña es requerida"),
  repassword: yup.string().oneOf([yup.ref("password"), null], "Las contraseñas no coinciden").required("La confirmación de contraseña es obligatoria"),
  role: yup.string()
});

export const UPDATE_SCHEMA_ADMIN = yup.object({
  name: yup.string().matches(/^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/, "Los nombres no son válidos").required("El nombre completo es requerido"),
  lastname: yup.string().matches(/^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/, "Los nombres no son válidos").required("El nombre completo es requerido"),
  email: yup.string().matches(/^[a-zA-Z0-9._%+-ñáéíóúüÜ]+@[a-zA-Z0-9.-]+\.[a-zA-ZñáéíóúüÜ]{2,}$/i, "El email no es válido").required("El email es requerido"),
  password: yup.string().matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/, "La contraseña no es válida").required("La contraseña es requerida"),
  repassword: yup.string().oneOf([yup.ref("password"), null], "Las contraseñas no coinciden").required("La confirmación de contraseña es obligatoria"),
});