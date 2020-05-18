jQuery(function($) {
	$('input[placeholder], textarea[placeholder]').placeholder();
	$(".phone-mask").mask("+7 999 999 99 99");

	var nowTime = new Date();
	var weekday = nowTime.getDay();
	weekday = weekday == 0 ? 7 : weekday;
	var day_offset = 60 * 60 * 24 - (((nowTime.valueOf() / 1000) % (60 * 60 * 24)) + (3600 * 4));
	var diffSecs = Math.floor(((7 - weekday) * 1000 * 60 * 60 * 24) + (day_offset * 1000));
	dif(Math.floor(diffSecs / 1000));

	$("#examples-gal").tinycarousel();

	$('input[placeholder], textarea[placeholder]').placeholder();
	$(".phone-mask").mask("+7 999 999 99 99");

	$('.order-form').submit(function(e) {
		e.preventDefault();

		var $form = $(this),
			ok = true,
			$name = $form.find('.fio'),
			$phone = $form.find('.phone'),
			$email = $form.find('.email');

		if ($name.length && $name.hasClass('required') && $name.val().length === 0) {
			ok = false;
			$name.addClass("error");
		} else
			$name.removeClass("error");

		if ($phone.length && $phone.hasClass('required') && !/\d{11}/.test($phone.val().replace(/\D/g, ''))) {
			ok = false;
			$phone.addClass("error");
		} else
			$phone.removeClass("error");

		if ($email.length && $email.hasClass('required')) {
				if (!checkEmail($email.val())) {
					ok = false;
					$email.addClass("error");
				} else
					$email.removeClass("error");
		}

		if (ok) {
			$form.ajaxSubmit({
				success: function(response) {
					hideModal();
					showModalTop('.modal.thanks', 250);
					$form.get(0).reset();
					if ($('body').data('metrika') && window['yaCounter' + $('body').data('metrika')])
						window['yaCounter' + $('body').data('metrika')].reachGoal('request');
					if (window._gaq)
						_gaq.push(['_trackEvent', 'Form', 'Sent']);
					$('.order-form').find('[type="submit"]').removeAttr('disabled');
				}
			});
		}
	});

	$('.order-btn').click(function(e) {
		e.preventDefault();
		var mod = $('.modal.order-modal');
		showModal(mod);
	});

	$('.call-request-btn').click(function(e) {
		e.preventDefault();
		var mod = $('.modal.phone-request');
		showModal(mod);
	});

	$('.overlay, .modal .close-btn, .modal .modal-close-text').click(function(e) {
		e.preventDefault();
		hideModal('.modal');
		$('.modal').removeClass('open');
	});

	$('.send-btn').click(function(e) {
		e.preventDefault();
		$(this).closest('form').submit();
	});
	
	$('#examples-gal ul li a').colorbox({rel:'group1', current: 'Изображение {current} из {total}'});
});


function showModal(modal) {
	showModalTop(modal, 66);
}

function showModalTop(modal, top) {
	modal = modal instanceof jQuery ? modal : jQuery(modal);
	modal.css("top", top + "px");
	modal.show();
	$(".overlay").show();
}

function hideModal() {
	$(".modals > div").hide();
	$(".overlay").hide();
}

function dif(diffSecs) {
	var sec = Math.floor(diffSecs % 60);
	var mins = Math.floor(diffSecs / 60) % 60;
	var hours = Math.floor(diffSecs / 60 / 60) % 24;
	var days = Math.floor(diffSecs / 60 / 60 / 24);

	var temp = convert(days, ['день', 'дня', 'дней']);
	$('.timer .days').html(temp[0]);
	$('.timer .days-text').html(temp[1]);
	var temp = convert(hours, ['час', 'часа', 'часов']);
	$('.timer .hours').html(temp[0] < 10 ? '0' + temp[0] : temp[0]);
	$('.timer .hours-text').html(temp[1]);
	var temp = convert(mins, ['минута', 'минуты', 'минут']);
	$('.timer .mins').html(temp[0] < 10 ? '0' + temp[0] : temp[0]);
	$('.timer .mins-text').html(temp[1]);
	var temp = convert(sec, ['секунда', 'секунды', 'секунд']);
	$('.timer .secs').html(temp[0] < 10 ? '0' + temp[0] : temp[0]);
	$('.timer .secs-text').html(temp[1]);

	if (diffSecs > 0)
	{
		t = setTimeout(function() {
			dif(diffSecs - 1)
		}, 1000);
	}
}

function convert(n, ar) {
	var o = n % 10;
	var l, g;
	switch (o) {
		case 1:
			l = 0;
			break;
		case 2:
		case 3:
		case 4:
			l = 1;
			break;
		default:
			l = 2;
			break;
	}

	var g = n % 100;
	if (g == 10 || g == 11 || g == 12 || g == 13 || g == 14) {
		l = 2;
	}
	return [n, ar[l]];
}

function checkEmail(mail) {
	return /^[a-zа-я0-9,!#\$%&'\*\+/=\?\^_`\{\|}~-]+(\.[a-zа-я0-9,!#\$%&'\*\+/=\?\^_`\{\|}~-]+)*@[a-zа-я0-9-]+(\.[a-z0-9-]+)*\.([a-zрф]{2,})$/.test(mail);
}