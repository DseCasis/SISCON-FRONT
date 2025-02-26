import Swal from "sweetalert2";

export const successLogin=()=>{
    return Swal({
        position: 'center',
        icon: "success",
        title: 'Se ha Iniciado Sesión De Manera Correcta',
        showConfirmButton: false,
        timer: 1500
    })
}

export const ErrorLogin = () => {
    return Swal({
        icon: "error",
        title: 'Oops...',
        text: 'Error al iniciar sesión',
    });
};