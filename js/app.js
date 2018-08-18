$(document).ready(function () {


    //form things
    (function () {

        const files = [];
        let dropzone = null;
        let formDataArr = [];

        //Validator
        (function () {
            $.validator.setDefaults({
                submitHandler: function (form) {

                    formDataArr = $(form).serializeArray();
                    dropzone.processQueue();
                    // formData.push({
                    //     name: 'file',
                    //     value: files
                    // });

                    // $.ajax({
                    //     type: form.method,
                    //     url: form.action,
                    //     data: $.param(formData),
                    //     success: function (response) {
                    //         // //console.log(response);
                    //         //
                    //         // if (response) {
                    //         //     self.hidePending(form, self.showSuccess.bind(self, form));
                    //         //
                    //         //     if (resolve) {
                    //         //         resolve.call(self, form, response);
                    //         //     }
                    //         // } else {
                    //         //     self.hidePending(form, self.showError.bind(self, form));
                    //         //
                    //         //     if (reject) {
                    //         //         reject.call(self, form, response);
                    //         //     }
                    //         // }
                    //         //
                    //         // self.resetForms(form);
                    //     },
                    //     error: function (response) {
                    //
                    //         // //console.log(response);
                    //         // //throw new Error(response.statusText);
                    //         // self.hidePending(form, self.showError.bind(self, form));
                    //         // self.resetForms(form);
                    //
                    //     }
                    // });


                    //$(form).ajaxSubmit();
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

        //dz
        (function () {

            dropzone = new Dropzone('#dz-form', {
                url: '/mail/mailer.php',
                uploadMultiple: true,
                autoProcessQueue: false,
            });

            dropzone.on('sending', function (file, xhr, formData) {

                // Will sendthe filesize along with the file as POST data.
                formDataArr.forEach(function (field) {
                    formData.append(field.name, field.value);
                });
            });


            // Dropzone.options.dzForm = {
            //     previewsContainer: '.dropzone-previews',
            //     init: function () {
            //         this.on("addedfile", function (file) {
            //             files.push(file);
            //         });
            //     }
            // };

        })();

        const $fileButton = $('#fileSelectButton');
        const $dropzoneForm = $('#dz-form');
        $fileButton.on({
            'click': function (evt) {
                $dropzoneForm.trigger('click', evt);
            }
        });

    })();


    //select2
    (function () {
        $('.tm-select').select2({
            placeholder: 'Выберите валюту',
            minimumResultsForSearch: Infinity
        });
    })();

    //popper tooltip
    (function () {

        const $reference = $('.tm-tooltip');

        const options = {
            position: 'top',
            content: '<div class="uk-text-left">\n' +
            '        <h6>\n' +
            '            Заголовок\n' +
            '        </h6>\n' +
            '        <p class="uk-margin-small">Не тратьте ценное время на распознавание PDF-документов, картинок, схем, чертежей, сканов и прочих файлов, которые вы получаете от своих клиентов.</p>\n' +
            '    </div>'
        };

        $reference.jTooltip(options);

    })();

    //dotline tooltip
    (function () {

        const $trigger5 = $('.tm-tooltip-trigger-5');
        const $elem5 = $('.tm-dotline-tooltip-5');

        const $trigger4 = $('.tm-tooltip-trigger-4');
        const $elem4 = $('.tm-dotline-tooltip-4');

        const $trigger3 = $('.tm-tooltip-trigger-3');
        const $elem3 = $('.tm-dotline-tooltip-3');

        const $trigger2 = $('.tm-tooltip-trigger-2');
        const $elem2 = $('.tm-dotline-tooltip-2');

        const $trigger1 = $('.tm-tooltip-trigger-1');
        const $elem1 = $('.tm-dotline-tooltip-1');

        $trigger5.on({
            'mouseenter': function () {
                $elem5.css('visibility', 'visible');
            },
            'mouseleave': function () {
                $elem5.css('visibility', 'hidden');
            }
        });

        $trigger4.on({
            'mouseenter': function () {
                $elem4.css('visibility', 'visible');
            },
            'mouseleave': function () {
                $elem4.css('visibility', 'hidden')
            }
        });

        $trigger3.on({
            'mouseenter': function () {
                $elem3.css('visibility', 'visible');
            },
            'mouseleave': function () {
                $elem3.css('visibility', 'hidden')
            }
        });

        $trigger2.on({
            'mouseenter': function () {
                $elem2.css('visibility', 'visible');
            },
            'mouseleave': function () {
                $elem2.css('visibility', 'hidden')
            }
        });

        $trigger1.on({
            'mouseenter': function () {
                $elem1.css('visibility', 'visible');
            },
            'mouseleave': function () {
                $elem1.css('visibility', 'hidden')
            }
        });

    })();

    //waves
    (function () {
        $('#feel-the-wave').wavify({
            height: 80,
            bones: 4,
            amplitude: 60,
            color: '#B289EF',
            speed: .15
        });

        $('#feel-the-wave-two').wavify({
            height: 60,
            bones: 3,
            amplitude: 40,
            color: 'rgba(150, 97, 255, .8)',
            speed: .25
        });
    })();
});