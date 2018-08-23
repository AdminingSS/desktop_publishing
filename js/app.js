$(document).ready(function () {
    //form things
    (function () {
        let dropzone = null;
        let formDataArr = null;
        let fileCnt = null;
        const $bigRoller = $('#bigRoller');
        const $sendForm = $('#sendForm');
        let $validator = null;

        //Validator
        (function () {
            $.validator.setDefaults({
                submitHandler: function (form) {
                    formDataArr = $(form).serializeArray();
                    dropzone.processQueue();
                    $bigRoller.show();
                }
            });


            const options = {
                ignore: [],
                rules: {
                    filescnt: {
                        required: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    message: {
                        required: false
                    }
                },
                messages: {
                    filescnt:
                        {
                            required: "Пожалуйста, загрузите файл(ы)"
                        },
                    email: {
                        required: "Пожалуйста, введите свой почтовый адрес",
                        email: "Пожалуйста, введите корректный почтовый адрес"
                    }
                },
                errorElement: "em",
                errorPlacement: function (error, element) {
                    // Add the `help-block` class to the error element
                    error.addClass("help-block");

                    // if (element.prop("type") === "checkbox") {
                    //     error.insertAfter(element.parent("label"));
                    // } else {
                    //     error.insertAfter(element);
                    // }
                },
                highlight: function (element, errorClass, validClass) {
                    $(element).parents(".tm-highlight").addClass("has-error").removeClass("has-success");
                },
                unhighlight: function (element, errorClass, validClass) {
                    $(element).parents(".tm-highlight").addClass("has-success").removeClass("has-error");
                }
            };

            $validator = $sendForm.validate(options);

            $('.filesend-submit').on('click',function () {
                if(!$validator.element('#filesCnt')) $('.tm-offshore-highlight').addClass('has-error');
            })
        })();

        //dz
        (function () {
            dropzone = new Dropzone('#dz-form', {
                url: './mail/mailer.php',
                uploadMultiple: true,
                autoProcessQueue: false,
                parallelUploads: 5,
                //addRemoveLinks: true,
                previewTemplate: '<div id="tpl">\n' +
                '        <div class="dz-preview dz-file-preview">\n' +
                '            <div class="dz-image uk-position-relative" data-dz-remove>\n' +
                '                <img data-dz-thumbnail />\n' +
                '                <div class="uk-position-absolute">\n' +
                '                    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '            <div class="dz-details">\n' +
                '                <div class="dz-size"><span data-dz-size></span></div>\n' +
                '                <div class="dz-filename"><span data-dz-name></span></div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>',
            });

            const $dzForma = $('#dz-form');
            //const $sendForm = $('#sendForm');
            const $filesCnt = $('#sendForm #filesCnt');
            const $successModal = $('#successModal');
            const $plusBtn = $('.plus-btn');

            $plusBtn.on({
                'click': function (evt) {
                    $dzForma.trigger('click', evt);
                }
            });

            dropzone.on('addedfile', function () {

                $dzForma.append($plusBtn);
                $plusBtn.show();

                fileCnt++;

                $filesCnt.val(fileCnt);

                setTimeout(function () {
                    $(".dz-image div").hide();
                }, 3000);

                //$sendForm.valid();
                if($validator.element('#filesCnt')) $('.tm-offshore-highlight').removeClass('has-error');
            });

            dropzone.on('removedfile', function () {
                fileCnt--;
                if (fileCnt <= 0) {
                    fileCnt = null;
                    $plusBtn.hide();
                    $("#fileNames").hide();
                }

                $filesCnt.val(fileCnt);

                //$sendForm.valid();
                if(!$validator.element('#filesCnt')) $('.tm-offshore-highlight').addClass('has-error');
            });

            dropzone.on('sending', function (file, xhr, formData) {

                // Will sendthe filesize along with the file as POST data.
                formDataArr.forEach(function (field) {
                    formData.append(field.name, field.value);
                });
            });

            dropzone.on('successmultiple', function () {
                dropzone.removeAllFiles(true);
                UIkit.modal($('#sendModal')).hide();
                UIkit.modal($successModal).show();
            });

            dropzone.on('error', function () {
                UIkit.modal($('#errorModal')).show();
            });

            dropzone.on('completemultiple', function () {
                $bigRoller.hide();
            });

        })();

        // delegate click
        (function () {
            const $fileButton = $('#fileSelectButton');
            const $dropzoneForm = $('#dz-form');
            $fileButton.on({
                'click': function (evt) {
                    $dropzoneForm.trigger('click', evt);
                }
            });
        })();

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
            '            Распознаем все форматы\n' +
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
    // (function () {
    //     $('#feel-the-wave').wavify({
    //         height: 80,
    //         bones: 4,
    //         amplitude: 60,
    //         color: '#B289EF',
    //         speed: .15
    //     });
    //
    //     $('#feel-the-wave-two').wavify({
    //         height: 60,
    //         bones: 3,
    //         amplitude: 40,
    //         color: 'rgba(150, 97, 255, .8)',
    //         speed: .25
    //     });
    // })();

    (function () {
        // $('#dz-form').hover(function (evt) {
        //
        //         let target = evt.target;
        //
        //         while (!target.hasClass('tm-dz-form')) {
        //             if (target.hasClass('dz-image')) {
        //                 // нашли элемент, который нас интересует!
        //                 $("#fileNames").html("hovered: " + evt.target.nodeName);
        //                 return;
        //             }
        //             target = target.parentNode;
        //         }
        //     }
        // );

        $('#dz-form').on({
            'mouseover': function (evt) {

                let $target = $(evt.target);

                while (!$target.hasClass('tm-dz-form')) {
                    if ($target.hasClass('dz-image')) {
                        // нашли элемент, который нас интересует!
                        $("#fileNames").html($target.parent().find('.dz-filename span').html());
                        $("#fileNames").show();
                        return;
                    }
                    $target = $target.parent();
                }
            },

            'mouseout': function () {
                $("#fileNames").html('');
                $("#fileNames").hide();

            }

        });

    })();
});