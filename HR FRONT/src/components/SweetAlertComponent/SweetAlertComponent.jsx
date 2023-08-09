
import Swal from 'sweetalert2';

const SweetAlertComponent = (type, message) => {
    try {
        if (type && message) {
            if (type === "error") {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Oops..",
                    text: message,
                    showConfirmButton: false,
                    toast: true,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.getContainer().addEventListener("mouseover", () => {
                            Swal.stopTimer()
                        })
                        Swal.getContainer().addEventListener("mouseleave", () => {
                            Swal.resumeTimer()
                        })
                    }
                });
            }
            else if (type === "success") {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Success",
                    text: message,
                    showConfirmButton: false,
                    toast: true,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.getContainer().addEventListener("mouseover", () => {
                            Swal.stopTimer()
                        })
                        Swal.getContainer().addEventListener("mouseleave", () => {
                            Swal.resumeTimer()
                        })
                    }
                });
            }
            else if (type === "info") {
                Swal.fire({
                    position: "top-end",
                    icon: "info",
                    title: "Info",
                    text: message,
                    showConfirmButton: false,
                    toast: true,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.getContainer().addEventListener("mouseover", () => {
                            Swal.stopTimer()
                        })
                        Swal.getContainer().addEventListener("mouseleave", () => {
                            Swal.resumeTimer()
                        })
                    }
                });
            }
        }

    }
    catch (err) {
        console.error(err);
    }

}

export default SweetAlertComponent;
