jQuery(function($) {
    var $forms = $("form.miwt-form");
    var CHECKED_CLASS = "checked";
    var SELECTED_CLASS = "selected";
    var UNSELECTED_CLASS = "unselected";
    var FOCUSED_CLASS = "focused";
    var curStep = "";
    var lastStep;

    function initScrollPage(context) {
        var $con = $(context || document);
        lastStep = curStep;
        curStep = $con.find(".wizard_procedure_step").attr("class").replace("wizard_procedure_step", "").trim();

        if ($con.find(".message-container .message").length && curStep !== lastStep && lastStep !== "") {
            $('html,body').scrollTop(100);
        }

        if (curStep !== lastStep && lastStep !== "") {
            $('html,body').scrollTop(100);
        }
    }

    $forms.each(function(idx, form){
        function initButtonSetup() {
            var $form = $(form);
            var $questions = $form.find(".question");
            var $colorQuestion = $(".question > .fav-color");
            var $colorButtons = $colorQuestion.find(".button_description_container");
            var $imageButtons = $questions.find('.button-image-container');

            $colorButtons.each(function (idx, button) {
                var $colorButton = $(button);

                $colorButton.on('click', function (e) {
                    $(this).siblings()
                        .removeClass(SELECTED_CLASS)
                        .addClass(UNSELECTED_CLASS)
                        .find("input[type=radio]")
                        .removeClass(FOCUSED_CLASS);
                    $(this).addClass(SELECTED_CLASS)
                        .removeClass(UNSELECTED_CLASS)
                        .find("input[type=radio]")
                        .addClass(FOCUSED_CLASS);
                });
            });

            $imageButtons.each(function (idx, button) {
                var $imageButton = $(button);

                if (($imageButton).find(".wrap").length == 0) {
                    $imageButton.wrapInner('<div class="wrap" />');


                    $imageButton.on('click', function (e) {
                        $(this).parents('.button_description_container')
                            .addClass(SELECTED_CLASS)
                            .removeClass(UNSELECTED_CLASS)
                            .siblings().removeClass(SELECTED_CLASS)
                            .addClass(UNSELECTED_CLASS)
                            .find('.button-image-container')
                            .removeClass(CHECKED_CLASS);

                        $(this).addClass(CHECKED_CLASS)
                            .siblings(".rtb")
                            .find("input[type=radio]")
                            .attr(CHECKED_CLASS, true).click();
                    });
                }
            });
        }

        if (!this.submit_options) {
            this.submit_options = {};
        }

        this.submit_options.postUpdate = function() {
            initScrollPage(this);
            initButtonSetup();
        };

        initButtonSetup();
    });
});