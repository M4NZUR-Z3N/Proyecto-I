$(document).ready(function() {
    $('.checkbox').change(function() {
        $('.checkbox').not(this).prop('checked', false).change();

        var $datos = $(this).closest('.servicios').find('.datos');

        if ($datos.css('max-height') === '500px') {
            $datos.css('max-height', '0');
        } else {
            $('.datos').css('max-height', '0');
            $datos.css('max-height', '500px');
        }
    });
});