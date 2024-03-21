import Swal from "sweetalert2";

// SweetAlert2의 mixin을 클래스로 생성합니다.
const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
  width: "400px",
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export default Toast;
