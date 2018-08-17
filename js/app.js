$(document).ready(function () {



    (function () {

        const files = [];

        //Validator
        (function () {
            $.validator.setDefaults({
                submitHandler: function (form) {

                    const formData = $(form).serializeArray();
                    formData.push({
                        name: 'file',
                        value: files
                    });

                    $.ajax({
                        type: form.method,
                        url: form.action,
                        data: $.param(formData),
                        success: function (response) {
                            // //console.log(response);
                            //
                            // if (response) {
                            //     self.hidePending(form, self.showSuccess.bind(self, form));
                            //
                            //     if (resolve) {
                            //         resolve.call(self, form, response);
                            //     }
                            // } else {
                            //     self.hidePending(form, self.showError.bind(self, form));
                            //
                            //     if (reject) {
                            //         reject.call(self, form, response);
                            //     }
                            // }
                            //
                            // self.resetForms(form);
                        },
                        error: function (response) {

                            // //console.log(response);
                            // //throw new Error(response.statusText);
                            // self.hidePending(form, self.showError.bind(self, form));
                            // self.resetForms(form);

                        }
                    });


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

            //const dropzone = new Dropzone('#fileUpload', {url: './mail/mauler.php'});
            Dropzone.options.dzForm = {
                previewsContainer: '.dropzone-previews',
                init: function() {
                    this.on("addedfile", function(file) {
                        files.push(file);
                    });
                }
            };
            // dropzone.on('addedfile', function (file) {
            //     files.push(file);
            // });

            // const $fileUpload = $("#fileUpload");
            //
            // // $fileUpload.dropzone({
            // //     url: "./mail/mailer.php",
            // //     parallelUploads: 5,
            // //     uploadMultiple: true,
            // //     autoProcessQueue: false,
            // //     addRemoveLinks: true,
            // //     previewsContainer: ".dropzone-previews",
            // //     forceFallback: false
            // //
            // //     // init: function() {
            // //     //     dzClosure = this; // Makes sure that 'this' is understood inside the functions below.
            // //     //
            // //     //     // for Dropzone to process the queue (instead of default form behavior):
            // //     //     $(".filesend-submit").click(function (e) {
            // //     //
            // //     //         // Make sure that the form isn't actually being sent.
            // //     //         e.preventDefault();
            // //     //         e.stopPropagation();
            // //     //         dzClosure.processQueue();
            // //     //     });
            // //     //
            // //     //     //send all the form data along with the files:
            // //     //     this.on("sendingmultiple", function(data, xhr, formData) {
            // //     //         formData.append("email", $(".filesend-email").val());
            // //     //         formData.append("message", $(".filesend-message").val());
            // //     //     });
            // //     // }
            // //
            // // });
            //
            // $fileUpload.on('addedfile',function (file) {
            //     console.dir(arguments);
            // });

        })();

        const $fileButton = $('#fileSelectButton');
        const $dropzoneForm = $('#dz-Form');
        $fileButton.on({
            'click' : function(evt) {
                $dropzoneForm.trigger('click',evt);
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
        $reference.each(function () {
            const ref = this;
            const anotherPopper = new Tooltip(ref, {
                title: '<div>\n' +
                '        <h6>\n' +
                '            Заголовок\n' +
                '        </h6>\n' +
                '        <p class="uk-margin-small">баран жираф и так далее, consectetur adipisicing elit. Asperiores dicta hic ipsam minima mollitia non placeat quaerat similique to</p>\n' +
                '    </div>',
                html: true
            });
        });

    })();

});

//function(){
//                     return $($(ref).attr('title'))[0];
//                 }