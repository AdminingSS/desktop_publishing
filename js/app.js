$(document).ready(function () {

    //Validator
    (function () {
        $.validator.setDefaults({
            submitHandler: function (form) {
                $(form).ajaxSubmit();
            }
        });

        const $sendForm = $('#sendForm');

        const options = {
            rules: {
                file: "required",
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: false
                }
            },
            messages: {
                file: "Пожалуйста, загрузите файл(ы)",
                email: {
                    required: "Пожалуйста, введите свой почтовый адрес",
                    email: "Пожалуйста, введите корректный почтовый адрес"
                }
            },
            errorElement: "em",
            errorPlacement: function (error, element) {
                // Add the `help-block` class to the error element
                error.addClass("help-block");

                if (element.prop("type") === "checkbox") {
                    error.insertAfter(element.parent("label"));
                } else {
                    error.insertAfter(element);
                }
            },
            highlight: function (element, errorClass, validClass) {
                $(element).parents(".tm-highlight").addClass("has-error").removeClass("has-success");
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).parents(".tm-highlight").addClass("has-success").removeClass("has-error");
            }
        };

        $sendForm.validate(options);
    })();

    //select2
    (function () {
        $('.tm-select').select2({
            placeholder: 'Выберите валюту для оплаты',
            minimumResultsForSearch: Infinity
        });
    })();

});
