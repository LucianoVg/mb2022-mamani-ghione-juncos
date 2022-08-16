
// 
// Scripts
// 

if (typeof window !== 'undefined') {
    $(document).ready(function () {
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
            $(this).toggleClass('active');
        });
    });
}
// window.addEventListener('DOMContentLoaded', event => {
   
// })